import { INestApplication } from "@nestjs/common";
import { Region } from "@prisma/client";
import * as request from "supertest";
import { CloseApp, MockApp, MockAppEnv } from "./app.mock";
import { MockRegion } from "../mocks";

const fakeRegions: Region[] = [
  MockRegion({
    cod: 0,
    name: "Regiao 0",
  }),
  MockRegion({
    cod: 1,
    name: "Regiao 1",
  }),
  MockRegion({
    cod: 2,
    name: "Regiao 2",
  }),
];

describe("RegionsController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await MockApp();
  });

  beforeEach(async () => {
    await MockAppEnv(app, { region: fakeRegions });
  });

  afterAll(() => {
    CloseApp(app);
  });

  describe("/regions (GET)", () => {
    const URL = "/regions";
    it("Deve retornar 200 para nao usuarios", () => {
      return request(app.getHttpServer())
        .get(URL)
        .send()
        .expect(200)
        .expect(fakeRegions);
    });
  });

  describe("/regions/{region_cod} (GET)", () => {
    const URL = (cod: number) => `/regions/${cod}`;
    it("Deve retornar 204 quando região não for encontrada.", () => {
      return request(app.getHttpServer()).get(URL(99)).send().expect(204);
    });

    it("Deve retornar 200 em caso de sucesso.", () => {
      return request(app.getHttpServer())
        .get(URL(1))
        .send()
        .expect(200)
        .expect(fakeRegions[1]);
    });
  });
});
