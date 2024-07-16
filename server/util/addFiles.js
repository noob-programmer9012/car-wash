import path from "node:path";

export default (req, res, next, model) => {
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      console.log(req.files[i]);
      if (req.files[i].mimetype.split("/")[0] === "video") {
        // service.videoUrl = req.files[i].path;
        model.videoUrl = path.join(
          "/",
          ".",
          "assets",
          "videos",
          req.files[i].originalname
        );
      } else if (
        req.files[i].mimetype.split("/")[0] === "image" &&
        req.files[i].mimetype.split("/")[1] === "svg+xml"
      ) {
        model.imageUrl = path.join(
          "/",
          ".",
          "assets",
          "svg",
          req.files[i].originalname
        );
      } else if (req.files[i].mimetype.split("/")[0] === "image") {
        // service.imageUrl = req.files[i].path;
        model.imageUrl = path.join(
          "/",
          ".",
          "assets",
          "images",
          req.files[i].originalname
        );
      }
    }
  } else if (req.file.mimetype.split("/")[0] === "image") {
    model.imageUrl = path.join(
      "/",
      ".",
      "assets",
      "images",
      req.file.originalname
    );
  }

  return;
};
