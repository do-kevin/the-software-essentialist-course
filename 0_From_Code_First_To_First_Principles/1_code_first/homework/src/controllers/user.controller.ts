import { AppDataSource } from "src/config/data-source";
import { User } from "src/entities/User";
import { Request, Response, NextFunction } from "express";
import { handleError } from "src/middlewares/error-handler";
import {
  createRegExp,
  oneOrMore,
  wordChar,
  letter,
  digit,
  exactly,
} from "magic-regexp";

export class UserController {
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.query).length > 0) {
      return next();
    }
    try {
      const userRepository = await AppDataSource.getRepository(User);
      const userList = await userRepository.find();

      return res.status(200).json(userList);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { first_name, last_name, email } = req.body;

      const emailRegex = createRegExp(
        oneOrMore(wordChar)
          .and("@")
          .and(oneOrMore(letter.or(digit)))
          .and(
            exactly(".")
              .and(oneOrMore(letter.or(digit)))
              .times.atLeast(1)
          )
      );

      const emailMatch = emailRegex.test(email);

      if (!emailMatch) {
        return res.status(404).send("This email is invalid.");
      }

      const userRepository = await AppDataSource.getRepository(User);

      const userDTO = new User();

      userDTO.firstName = first_name;
      userDTO.lastName = last_name;
      userDTO.email = email;

      let newUser = await userRepository.create(userDTO);
      newUser = await AppDataSource.manager.save(newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      handleError(error, res);
    }
  }

  static async editUser(req: Request, res: Response) {
    try {
      const { first_name, last_name, email } = req.body;
      const { userId } = req.params;

      const userRepository = await AppDataSource.getRepository(User);

      const dto = { firstName: first_name, lastName: last_name, email };

      const updatedUser = await userRepository
        .createQueryBuilder()
        .update(User)
        .set(dto)
        .where("id = :id", { id: userId })
        .execute();

      if (updatedUser.affected === 0) {
        return res.status(404).send("User has not been found.");
      }

      return res.status(201).send("User has been updated.");
    } catch (error) {
      handleError(error, res);
    }
  }

  static async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.query;

      const userRepository = await AppDataSource.getRepository(User);

      const returnUser = await userRepository.findOne({
        where: {
          email: email?.toString(),
        },
      });

      if (!returnUser) {
        return res.status(404).send("User has not been found.");
      }

      return res.json(returnUser);
    } catch (error) {
      handleError(error, res);
    }
  }
}
