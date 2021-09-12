import "@testing-library/jest-dom";
import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dscwpcjae",
  api_key: "453518885849135",
  api_secret: "lrwz8rdHCzyJwoSEgDPH2LAUWLg",
  secure: true,
});

describe("Pruebas de fileUpload.js)", () => {
  test("debe de cargar un archivo y retornar el url", async () => {
    const resp = await fetch(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFwa9ZWCnyO1ag6N9w_aXxEAktxtg4a4xgA&usqp=CAU"
    );
    const blob = await resp.blob();
    const file = new File([blob], "evergaden.png");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    //Borrar la imagen
    const segments = url.split("/");
    const image = segments[segments.length - 1];
    const imageName = image.split(".");
    const public_ids = imageName[0];

    await cloudinary.v2.api.delete_resources(
      [public_ids],
      function (error, result) {
        console.log(result, error);
      }
    );
  });

  test("debe de retornar un error", async () => {
    try {
      await fileUpload(new File([], "evergaden.png"));
    } catch (e) {
      expect(e).toEqual({ error: { message: "Empty file" } });
    }
  });
});
