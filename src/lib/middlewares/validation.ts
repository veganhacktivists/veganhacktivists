import withJoi from 'next-joi';

const validate = withJoi({
  onValidationError: (_, res, error) => {
    res.status(400).json({ error: error.message });
  },
});

export default validate;
