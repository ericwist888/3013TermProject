/////////// the original coding//////////
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useBoundStore from "../../store/Store";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { loginService, authLoading, user } = useBoundStore((state) => state);

//   useEffect(() => {
//     if (!!user) {
//       navigate("/posts");
//     }
//   }, [user]);

//   const onLogin = async (e) => {
//     e.preventDefault();
//     let email = e.target.email?.value;
//     let password = e.target.password?.value;
//     if (!email || !password) return;
//     loginService(email, password);
//   };
//   return (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <form onSubmit={onLogin}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gridGap: "20px",
//             background: "#d3d3d3",
//             padding: "50px",
//           }}
//         >
//           <h1>This is the login page</h1>
//           <input
//             placeholder="email"
//             name="email"
//             type="email"
//             required
//             style={{ minWidth: "320px", height: "26px" }}
//           />
//           <input
//             placeholder="password"
//             name="password"
//             type="password"
//             required
//             style={{ minWidth: "320px", height: "26px" }}
//           />
//           <button type="submit">login</button>
//           {authLoading ? <h2>Loading...</h2> : null}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
// Login.page.jsx
// LoginPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { AuthenticationTitle } from "./AuthenticationTitle";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore();

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, [user, navigate]);

  const onLogin = (email, password) => {
    loginService(email, password);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!authLoading ? (
        <AuthenticationTitle onLogin={onLogin} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default LoginPage;
