const helpers = require('./helpers/request-helper');

module.exports = async (req, res, routes) => {
    const route = routes.find((route) => {
        const methodMatch = route.method === req.method;
        let pathMatch = false;

        if (typeof route.path === 'object') {
            pathMatch = req.url.match(route.path);
        } else {
            pathMatch = route.path === req.url;
        }

        return pathMatch && methodMatch;
    });

    let param = null;

    if (route && typeof route.path === 'object') {
        param = req.url.match(route.path)[1];
    }

    if (route) {
        let body = null;
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            body = await getPostData(req);
        }

        return route.handler(req, res, param, body);
    } else {
        return helpers.error(res, 'Endpoint not found', 404);
    }
};

function getPostData(req) {
    return new Promise((resolve, reject) => {
       try {
           let body = '';
           req.on('data', chunk => {
               body += chunk.toString();
           });

           req.on('end', () => {
               resolve(body);
           });
       } catch (e) {
           reject(e);
       }
    });
}
