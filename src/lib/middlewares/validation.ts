import HttpCodes from 'http-status-codes';

import type { ValidationError } from 'joi';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import type { ValidationOptions, Schema } from 'joi';

type ValidableRequestFields = Pick<
  NextApiRequest,
  'body' | 'headers' | 'query'
>;

interface ValidationSchemas<Q, B, H> {
  body: Schema<B>;
  headers: Schema<H>;
  query: Schema<Q>;
}

type TypedNextRequest<
  Q = NextApiRequest['query'],
  B = NextApiRequest['body'],
  H = NextApiRequest['headers']
> = Omit<NextApiRequest, keyof ValidableRequestFields> & {
  body: B;
  headers: H;
  query: Q;
};

type ValidationFunction<Q, B, H, T> = (
  schemas: Partial<ValidationSchemas<Q, B, H>>,
  handler?: (
    req: TypedNextRequest<Q, B, H>,
    res: NextApiResponse<T>
  ) => ReturnType<NextApiHandler>
) => NextApiHandler;

const supportedFields: (keyof ValidableRequestFields)[] = [
  'body',
  'headers',
  'query',
];

interface ValidatorProps {
  onValidationError?: (
    req: NextApiRequest,
    res: NextApiResponse,
    errors: ValidationError[]
  ) => void | Promise<void>;
  validationOptions?: ValidationOptions;
}

const validator = <Q, B, H, T>({
  validationOptions,
  onValidationError = (_, res) => {
    res.status(400).end();
  },
}: ValidatorProps = {}): ValidationFunction<Q, B, H, T> => {
  return (schemas, handler) => {
    const keys = Object.keys(schemas) as (keyof ValidableRequestFields)[];
    const fieldsToValidate = keys.filter((field) =>
      supportedFields.includes(field)
    );
    return (req, res) => {
      const originalReq = req as unknown as NextApiRequest;
      const errors: ValidationError[] = [];
      try {
        const newData = new Map<keyof ValidableRequestFields, Q | B | H>();
        fieldsToValidate.forEach((field) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const schema = schemas[field]!;
          const { value, error } = schema
            .required()
            .validate(req[field], validationOptions);

          if (error) {
            errors.push(error);
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          newData.set(field, value);
        });

        if (validationOptions?.convert !== false) {
          newData.forEach((value, field) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            req[field] = value as any;
          });
        }
      } catch (error) {
        throw error;
      }

      if (errors.length) {
        return onValidationError(originalReq, res, errors);
      }

      if (handler !== undefined) {
        return handler(req as unknown as TypedNextRequest<Q, B, H>, res);
      }

      return res.status(HttpCodes.BAD_REQUEST).end();
    };
  };
};

const withValidation = <Q, B, H, T>(
  schemas: Partial<ValidationSchemas<Q, B, H>>,
  handler?: (
    req: TypedNextRequest<Q, B, H>,
    res: NextApiResponse<T>
  ) => ReturnType<NextApiHandler>
) =>
  validator({
    onValidationError: (_, res, errors) => {
      const errorMessages = errors.flatMap((error) =>
        error.details.map((d) => d.message)
      );
      res.status(400).json({ errors: errorMessages });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
  })(schemas, handler as any);

export default withValidation;
