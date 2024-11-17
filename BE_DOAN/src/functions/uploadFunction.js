const uploadFunction = async (req, res) => {
  try {
    console.log("🚀 ~ uploadFunction ~ req.file:", req.files)
    const images = req.files.images;

    if (!images) {
      return res.status(400).send("No file uploaded.");
    }

    const dataObject = [];
    for (const image of images) {
      const relativeUrl = `images/${image.filename}`;
      const absoluteUrl = `${process.env.API_BASE_URL}/media/${relativeUrl}`;

      const data = {
        absoluteUrl,
        relativeUrl,
        original_name: image.originalname,
        generate_name: image.filename,
      };

      dataObject.push(data);
    }
    console.log("🚀 ~ uploadFunction ~ data:", dataObject)

    res.json(dataObject);
  } catch (error) {
    return res.status(400).json({
      status: "ERR",
      error: error.message
    });
  }
};

export default {
  uploadFunction
}