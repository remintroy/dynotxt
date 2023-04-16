export const createExpressCallback = (controller) => {
  return (req, res) => {
    //
    const requestObj = {
      query: req.query,
      params: req.params,
      body: req.body,
      method: req.method,
      path: req.path,
    };

    controller(requestObj)
      .then((response: { status: string; body: object }) => {
        if (response.status) res.status(response.status);
        res.send(response.body);
      })
      .catch((error: { code: number; error: object; message: string }) => {
        if (error.code) res.status(error.code);
        else res.status(500);
        res.send(error);
      });
  };
};
