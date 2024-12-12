import { useEffect, useState } from "react";
import { useS3FileManager } from "./../../hooks/useS3FileManager";
import { PrimaryButton } from "../Button";
import { BasicLoader } from "../Loader";

interface TestUseS3FileManagerProps {
  dataToAdd: { [key: string]: string } | { [key: string]: string }[];
  dataToUpdate: { [key: string]: string } | { [key: string]: string }[];
  id: string;
  configFileName: string;
}

type dataType = { [key: string]: string } | null;

const TestUseS3FileManager: React.FC<TestUseS3FileManagerProps> = ({
  dataToAdd = { firstName: "Test", lastName: "Data" },
  dataToUpdate = { firstName: "TestUpdated" },
  configFileName = "config_test.json",
  id = "8904f52d-0ca3-4ae7-9454-50ffac499849",
}) => {
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);
  const [fetchedData, setFetchedData] = useState<dataType>(null);
  const [loaderCount, setLoaderCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const setLoader = () => setLoaderCount(loaderCount + 1);
  const resetLoader = () => setLoaderCount(loaderCount - 0);
  const s3FileManager = useS3FileManager({
    bucketName: "test-parth-ui",
    config: {
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    },
    configFileName: configFileName,
    setLoader: setLoader,
    resetLoader: resetLoader,
  });

  const { addNewRow, editRow, uploadFile, deleteRow, getRow } = s3FileManager;

  useEffect(() => {
    console.log(loaderCount);
  }, [loaderCount]);

  const printTheData = (data: dataType | string, size: string = "32px") => {
    // return <div>Hel</div>;
    if (!data) return <div></div>;
    if (typeof data !== "object") {
      return (
        <div style={{ border: "2px solid green", fontSize: size }}>{data}</div>
      );
    }
    if (Array.isArray(data)) {
      data.forEach((value) => {
        return printTheData(value, size);
      });
    }

    return Object.keys(data).map((key) => {
      return (
        <div
          style={{
            display: "flex",
            width: "fit-content",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(125,125,125)",
            border: `1px solid ${Array.isArray(data) ? "red" : ""}`,
            // border: `1px solid ${typeof data !== "object" ? "red" : "blue"}`,
          }}
        >
          <span
            style={{
              border: "2px solid grey",
              color: "white",
              padding: "8px",
              fontSize: size,
            }}
          >
            {key} <span style={{ color: "blue" }}>{"\u2192"}</span>
          </span>
          <span
            style={{
              backgroundColor: "rgb(0,0,0)",
              border: "2px solid black",
              color: "white",
              padding: "8px",
              fontSize: size,
            }}
          >
            {printTheData(data[key], size)}{" "}
          </span>
        </div>
      );
    });
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", rowGap: "32px" }}>
        <div
          style={{
            display: "flex",
            border: "4px solid black",
            width: "500px",
            backgroundColor: "lightblue",
            alignItems: "center",
            padding: "8px",
            columnGap: "16px",
          }}
        >
          <PrimaryButton onClick={() => addNewRow(dataToAdd)}>
            Add New Row
          </PrimaryButton>
          {/* @ts-ignore */}
          <div>{printTheData(dataToAdd, "8px")}</div>
        </div>
        <div
          style={{
            display: "flex",
            border: "4px solid black",
            width: "500px",
            backgroundColor: "lightblue",
            alignItems: "center",
            padding: "8px",
            columnGap: "16px",
          }}
        >
          <PrimaryButton onClick={() => editRow(id, dataToUpdate)}>
            Edit the Row
          </PrimaryButton>
          {/* @ts-ignore */}
          <div>{printTheData(dataToUpdate, "8px")}</div>
        </div>
        <div
          style={{
            display: "flex",
            border: "4px solid black",
            width: "500px",
            backgroundColor: "lightblue",
            alignItems: "center",
            padding: "8px",
            columnGap: "16px",
          }}
        >
          <PrimaryButton
            onClick={() => {
              if (fileToUpload) uploadFile(fileToUpload);
            }}
          >
            Upload
          </PrimaryButton>
          <div>
            {" "}
            <input
              type="file"
              onChange={(e) => {
                setFileToUpload(e.target.files?.[0]);
                // if (e.target.files?.[0]) uploadFile(e.target.files?.[0]);
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            border: "4px solid black",
            width: "500px",
            backgroundColor: "lightblue",
            alignItems: "center",
            padding: "8px",
            columnGap: "16px",
          }}
        >
          <PrimaryButton onClick={() => deleteRow(id)}>
            Delete the Row
          </PrimaryButton>
          <div
            style={{ padding: "4px", backgroundColor: "black", color: "white" }}
          >
            {id}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            border: "4px solid black",
            width: "500px",
            backgroundColor: "lightblue",
            alignItems: "center",
            padding: "8px",
            columnGap: "16px",
          }}
        >
          <PrimaryButton
            onClick={() => {
              const row = getRow(id);
              setFetchedData(row);
              console.log(row);
              console.log(printTheData(row));
            }}
          >
            Get the Row
          </PrimaryButton>
          <div
            style={{ padding: "4px", backgroundColor: "black", color: "white" }}
          >
            {id}
          </div>
        </div>
      </div>
      <div style={{ margin: "32px" }}>{printTheData(fetchedData)}</div>
      <BasicLoader count={loaderCount} progress={uploadProgress} />
    </div>
  );
};
export default TestUseS3FileManager;
