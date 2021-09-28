import HttpCodes from 'http-status-codes';

export const errorBody: (code: number) => { status: number; message: string } =
  (code) => {
    return {
      status: code,
      message: HttpCodes.getStatusText(code),
    };
  };
