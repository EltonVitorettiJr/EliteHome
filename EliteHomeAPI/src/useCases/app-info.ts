import packagejson from "../../package.json";

export class AppInfoUseCase {
  execute() {
    const { name, version, author } = packagejson;

    return { name, version, author };
  }
}
