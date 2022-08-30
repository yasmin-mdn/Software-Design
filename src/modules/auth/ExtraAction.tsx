import { useHistory } from "react-router-dom";

const Action = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: any;
}) => {
  return (
    <span
      onClick={onClick}
      className="cursor-pointer scale-105 hover:text-[#3498db] transition-all"
    >
      {children}
    </span>
  );
};

export function LoginExtraAction() {
  const history = useHistory();
  return (
    <div className="pt-4 px-2 pb-0 w-full flex justify-between text-xs">
      <Action
        onClick={() => {
          history.push("register");
        }}
      >
        dont have an Account?
      </Action>
      {/* <Action
        onClick={() => {
          history.push("forgot-password");
        }}
      >
        forgot password
      </Action> */}
      {/* <Action
        onClick={() => {
          history.push("login-username");
        }}
      >
       login using username
      </Action> */}
    </div>
  );
}
export function RegisterExtraAction() {
  const history = useHistory();
  return (
    <div className="pt-4 px-2 pb-0 w-full flex justify-start text-xs">
      <Action
        onClick={() => {
          history.push("login");
        }}
      >
        already have an account?
      </Action>
    </div>
  );
}

export function ForgotPassExtraAction() {
  const history = useHistory();
  return (
    <div className="pt-4 px-2 pb-0 w-full flex justify-start text-xs">
      <Action
        onClick={() => {
          history.push("login");
        }}
      >
        get back to login
      </Action>
    </div>
  );
}
