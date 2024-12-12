// import AWS from "aws-sdk";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

interface S3Config {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}
interface UseS3FileManagerParams {
  bucketName: string;
  configFileName?: string;
  setLoader?: () => void;
  resetLoader?: () => void;
  config: S3Config;
}

type dataType = { [key: string]: string } | { [key: string]: string }[];

export const useS3FileManager = ({
  bucketName,
  config,
  configFileName,
  setLoader = () => "",
  resetLoader = () => "",
}: UseS3FileManagerParams) => {
  // AWS.config.update({
  //   accessKeyId: config.credentials.accessKeyId,
  //   secretAccessKey: config.credentials.secretAccessKey,
  //   region: config.region,
  // });
  const s3 = new S3Client({
    region: config.region, // Your region
    credentials: {
      accessKeyId: config.credentials.accessKeyId,
      secretAccessKey: config.credentials.secretAccessKey,
    },
  });
  // const s3 = new AWS.S3();

  useEffect(() => {
    readConfig();
    return () => {
      localStorage.removeItem("config_data");
    };
  }, []);

  const uploadFile = (
    file: File,
    uploadProgressCallBack: (progress: number) => void = (progress) =>
      console.log(progress)
  ) => {
    const params = {
      Bucket: bucketName,
      Key: file?.name,
      Body: file,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    setLoader();

    const upload = new Upload({
      client: s3,
      params: params,
      leavePartsOnError: false, // Optionally, set to true to keep parts uploaded in case of failure
    });

    upload.on("httpUploadProgress", (evt) => {
      uploadProgressCallBack(((evt.loaded || 0) * 100) / (evt.total || 1));
      console.log(
        "Uploading " + ((evt.loaded || 0) * 100) / (evt.total || 1) + "%"
      );
    });
    upload
      .done()
      .then((res: any) => {
        resetLoader();
      })
      .catch((error: any) => {
        console.error("Error uploading file:", error);
        resetLoader();
      });
  };

  const addNewRow = (data: dataType, author = null) => {
    const configDataInStore = localStorage.getItem("config_data");
    if (!configDataInStore) {
      throw "Error Adding the Row, check if Config File Exists";
    }
    console.log(configDataInStore);
    const configData = JSON.parse(configDataInStore);
    const id = uuidv4();
    const newJsonData = [...configData, { id, ...data }];
    const jsonString = JSON.stringify(newJsonData);
    console.log(jsonString);
    const jsonBlob = new Blob([jsonString], { type: "application/json" });
    uploadConfig(jsonBlob);
  };

  const createNewConfigFile = () => {
    const jsonString = JSON.stringify([]);
    const jsonBlob = new Blob([jsonString], { type: "application/json" });
    uploadConfig(jsonBlob);
  };

  const uploadConfig = (fileBlob: Blob) => {
    const params = {
      Bucket: bucketName,
      Key: configFileName || "", // e.g., 'path/to/yourfile.json'
      Body: fileBlob,
      ContentType: "application/json",
    };
    setLoader();
    const command = new PutObjectCommand(params);
    s3.send(command)
      .then((res) => {
        console.log(res);
        readConfig();
        // resetLoader();
      })
      .catch((error) => {
        console.error("Error uploading Config file:", error);
        // resetLoader();
      });
  };

  const readConfig = () => {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: configFileName || "",
    });

    setLoader();
    s3.send(command)
      .then((res) => {
        res.Body?.transformToString().then((res) => {
          console.log(res);
          localStorage.setItem("config_data", res);
        });
        resetLoader();
      })
      .catch((error) => {
        if (error.Code === "NoSuchKey") {
          console.error("Creating the given Config File");
          createNewConfigFile();
        }
      });
  };
  const editRow = (id: string, dataToUpdate: dataType) => {
    const configDataInStore = localStorage.getItem("config_data");
    const configData = JSON.parse(configDataInStore || "{}");
    const newJsonData = configData.map((data: { [key: string]: string }) => {
      if (data.id === id) {
        return { ...data, ...dataToUpdate };
      }
      return data;
    });
    const jsonString = JSON.stringify(newJsonData);
    const jsonBlob = new Blob([jsonString], { type: "application/json" });
    uploadConfig(jsonBlob);
  };

  const deleteRow = (id: string) => {
    const configDataInStore = localStorage.getItem("config_data");
    const configData = JSON.parse(configDataInStore || "{}");
    const newJsonData = configData.filter(
      (data: { [key: string]: string }) => data.id !== id
    );
    const jsonString = JSON.stringify(newJsonData);
    const jsonBlob = new Blob([jsonString], { type: "application/json" });
    uploadConfig(jsonBlob);
  };

  const getRow = (id: string) => {
    const configDataInStore = localStorage.getItem("config_data");
    const configData = JSON.parse(configDataInStore || "{}");
    console.log(configData, id);
    try {
      return configData.find(
        (data: { [key: string]: string }) => data.id === id
      );
    } catch (error) {
      console.log("Error retiveing the Data");
      return null;
    }
  };

  // if (!localStorage.getItem("config_data") && configFileName) {
  // readConfig();
  // }

  return {
    uploadFile,
    deleteRow,
    editRow,
    getRow,
    addNewRow,
  };
};
