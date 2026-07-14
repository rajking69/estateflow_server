import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match ? `${match[1]} already exists` : 'Duplicate entry';

  const errorSources: TErrorSources = [
    {
      path: '',
      message: extractedMessage,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Entry',
    errorSources,
  };
};

export default handleDuplicateError;
