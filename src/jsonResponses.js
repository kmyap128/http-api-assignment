// send a json object
const respondJSON = (request, response, status, object) => {
  // stringify object
  const content = JSON.stringify(object);

  // set headers
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  // write responses
  response.write(content);
  response.end();
};

// success status code
const success = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response',
  };

  // send json with a success status code
  respondJSON(request, response, 200, responseJSON);
};

// bad request status code
const badRequest = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request is missing valid=true query parameter
  if (!request.query.valid || request.query.valid !== 'true') {
    // set error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give error a consistent id
    responseJSON.id = 'badRequest';
    // return json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // send json with a 200 success code if parameter is present
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'You have successfully viewed the content.',
  };

  // if request is missing loggedIn=yes query parameter
  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    // set error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    // give error a consistent id
    responseJSON.id = 'badRequest';
    // return json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }
  // send json with a 200 success code if parameter is present
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'You do not have access to this content.',
  };

  // send json with a 403 status code
  return respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
  };

  // send json with a 500 status code
  return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  };

  // send json with a 501 status code
  return respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  // error message with description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return json with 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
