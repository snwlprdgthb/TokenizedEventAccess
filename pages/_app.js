import "@styles/globals.css";
// import { ToastContainer } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

const noOperationComponent = ({ children }) => <>{children}</>;

function App({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : noOperationComponent;

  return (
    <Layout>
      {/* <ToastContainer /> */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
