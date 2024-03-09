import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const PdfReader = () => {
  const docs = [
    { uri: "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf" }, // Remote file
   
  ];

  return (
    <DocViewer
      documents={docs}
      initialActiveDocument={docs[1]}
      pluginRenderers={DocViewerRenderers}
      style={{height:500, width:500}}
    />
  );
};

export default PdfReader