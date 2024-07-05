import { signInWithPopup } from "firebase/auth";
import { HandleCache } from "./helpers";
import { useRouter } from "../routes/hooks";
import {
  ToastNotification,
  options,
} from "../components/ToastNotificationComponents";

export const SignInWithExternal = (auth, provider, AuthProvider) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = AuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      HandleCache({ name: "accessToken", data: token }, "set");
      HandleCache({ name: "user", data: user }, "set");
      useRouter.push("/dashboard");
    })
    .catch((error) => {
      // Handle Errors here.
    //   const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
    //   const email = error.customData.email;
      // The AuthCredential type that was used.
    //   const credential = AuthProvider.credentialFromError(error);
      // ...

      ToastNotification("error", errorMessage, options);
    });
};
