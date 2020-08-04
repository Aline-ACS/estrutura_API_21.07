import User from '../models/User';

class UserController {
  // buscar todos os dados da tabela
  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.json({ users });
    } catch (error) {
      return res.json({ error });
    }
  }

  // buscar só alguns dados da tabela, posso usar [users] ou users
  // async index(req, res) {
  //   try {
  //     const users = await User.findAll({
  //       attributes: ['uid', 'name', 'age'],
  //     });

  //     return res.json({ users });
  //   } catch (error) {
  //     return res.json({ error });
  //   }
  // }

  async store(req, res) {
    try {
      const user = await User.create(req.body);

      return res.json({ user });
    } catch (error) {
      const response = {
        message: 'dados incorretos',
        error,
      };
      return res.json(response);
    }
  }

  // async show(req, res) {
  //   try {
  //     const user = await User.findByPk(req.params.id);

  //     return res.json(user);
  //   } catch (error) {
  //     const response = {
  //       message: 'erro ao buscar usuário',
  //       error,
  //     };
  //     return res.json(response);
  //   }
  // }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const user = await User.findOne({ where: { uid } });

      return res.json(user);
    } catch (error) {
      const response = {
        message: 'erro ao buscar usuário',
        error,
      };
      return res.json(response);
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const [updated] = await User.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('usuário não encontrado');
      }

      return res.json({ result: 'DATA_UPDATED' });
    } catch (error) {
      return res.json({ result: 'usuário não encontrado' });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await User.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('usuário não encontrado');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new UserController();
