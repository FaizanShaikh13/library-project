class GenericMethod {
  static async insertDb(req, res, model, msg, query = {}) {
    console.log(req.body)
    try {
      const data = await model.create({...req.body});
      res.status(201).json({
        success: true,
        msg: msg ? msg : `${model.name} created successfully`,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  static async getall(req, res, model, query = {}) {
    try {
      const data = await model.findAndCountAll({
        ...req.query.pagination,
        ...query,
      });
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getone(req, res, model, query = {}) {
    const { id } = req.params;
    try {
      const data = await model.findOne({
        where: { id },
        ...query,
      });
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async delete(req, res, model, query = {}, msg) {
    const { id } = req.params;
    try {
      const data = await model.findOne({
        where: { id },
      });
      await data.destroy();

      res
        .status(201)
        .json({
          success: true,
          msg: msg ? msg : `${model.name} deleted successfully`,
        });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async checkIfExists(req, res, model, query = {}) {
    const { id } = req.params;

    const check = await model.findOne({
      where: { id },
      ...query,
    });
    if (!check) {
      return res
        .status(404)
        .json({ error: true, msg: `${model.name} does not exists` });
    }
    return res.json({ error: false, data });
  }

  static async update(req, res, model, query = {}, msg) {
    const { id } = req.params;

    try {
      const data = await model.findOne({
        where: { id },
        ...query,
      });
      if (!data) {
        return res.status(404).json({
          error: true,
          data: { msg: `${model.name} does not exists` },
        });
      }
      const update = await data.update({ ...req.body, ...query });

      res.status(201).json({
        msg: msg ? msg : `${model.name} updated successfully`,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = GenericMethod;
