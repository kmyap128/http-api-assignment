// send a json object
const respond = (request, response, status, content, type) => {
  // set headers
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  // write responses
  response.write(content);
  response.end();
};

// success status code
const success = (request, response) => {
  // message to send
  const newResponse = {
    message: 'This is a successful response',
  };
  if (request.acceptedTypes == 'text/xml') {
    const responseXML = `<response><message>${newResponse.message}</message></response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(newResponse);
  // send json with a success status code
  return respond(request, response, 200, responseJSON, 'application/json');
};

// bad request status code
const badRequest = (request, response) => {
  // message to send
  const newResponse = {
    message: 'This request has the required parameters',
  };

  // if the request is missing valid=true query parameter
  if (!request.query.valid || request.query.valid !== 'true') {
    // set error message
    newResponse.message = 'Missing valid query parameter set to true';
    // give error a consistent id
    newResponse.id = 'badRequest';

    // check for xml and handle it
    if (request.acceptedTypes == 'text/xml') {
      const responseXML = `<response><message>${newResponse.message}</message></response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    const responseJSON = JSON.stringify(newResponse);
    // return json with a 400 bad request code
    return respond(request, response, 400, responseJSON, 'application/json');
  }

  // check for xml and handle it
  if (request.acceptedTypes == 'text/xml') {
    const responseXML = `<response><message>${newResponse.message}</message></response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(newResponse);
  return respond(request, response, 200, responseJSON, 'application/json');
};

const unauthorized = (request, response) => {
  // message to send
  const newResponse = {
    message: 'You have successfully viewed the content.',
  };

  // if request is missing loggedIn=yes query parameter
  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    // set error message
    newResponse.message = 'Missing loggedIn query parameter set to yes';
    // give error a consistent id
    newResponse.id = 'badRequest';
    // check for xml and handle it
    if (request.acceptedTypes == 'text/xml') {
      const responseXML = `<response><message>${newResponse.message}</message></response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    const responseJSON = JSON.stringify(newResponse);
    // return json with a 400 bad request code
    return respond(request, response, 400, responseJSON, 'application/json');
  }

  if (request.acceptedTypes == 'text/xml') {
    const responseXML = `<response><message>${newResponse.message}</message></response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(newResponse);
  return respond(request, response, 200, responseJSON, 'application/json');
};

const forbidden = (request, response) => {
  // message to send
  const newResponse = {
    message: 'You do not have access to this content.',
  };
  if (request.acceptedTypes == 'text/xml') {
    const responseXML = `<response><message>${newResponse.message}</message></response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(newResponse);
  return respond(request, response, 403, responseJSON, 'application/json');
};

const internal = (request, response) => {
  // message to send
  const newResponse = {
    message: 'Internal Server Error. Something went wrong.',
  };
  if (request.acceptedTypes == 'text/xml') {
    const responseXML = `<response><message>${newResponse.message}</message></response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(newResponse);
  return respond(request, response, 500, responseJSON, 'application/json');
};

const notImplemented = (request, response) => {
  // message to send
  const newResponse = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  };
  if (request.acceptedTypes == 'text/xml') {
    const responseXML = `<response><message>${newResponse.message}</message></response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(newResponse);
  return respond(request, response, 501, responseJSON, 'application/json');
};

const notFound = (request, response) => {
  // error message with description and consistent error id
  const newResponse = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (request.acceptedTypes == 'text/xml') {
    const responseXML = `<response><message>${newResponse.message}</message></response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(newResponse);
  return respond(request, response, 404, responseJSON, 'application/json');
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
