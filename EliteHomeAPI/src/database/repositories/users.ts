// biome-ignore assist/source/organizeImports: <Falso positivo do Biome>
import { knex } from "..";
import type { User } from "../../entities/user";
import { UserSchema } from "../schemas/user";

export class UserRepository {
  async create(user: User): Promise<User> {
    const [createUser] = await knex<UserSchema>("users")
      .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      })
      .returning("*");

    const userEntity = new UserSchema(createUser as User).toEntity();

    return userEntity;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await knex<UserSchema>("users").where({
      email,
    });

    if (user.length === 0) {
      return undefined;
    }

    const userEntity = user.map((u) => new UserSchema(u).toEntity());

    return userEntity.at(0);
  }
}
