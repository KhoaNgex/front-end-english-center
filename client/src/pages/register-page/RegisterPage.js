//@mui
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import RegisterForm from "./RegisterForm";

import LoginBg from "../../assets/startbg.jpg";

const StyledRoot = styled("div")({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundImage: `url(${LoginBg})`,

  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
});

const StyledPaper = styled(Paper)({
  padding: 30,
  paddingTop: 40,
  height: "92vh",
  width: 500,
});

export default function LoginPage() {
  return (
    <StyledRoot>
      <StyledPaper>
        <RegisterForm />
      </StyledPaper>
    </StyledRoot>
  );
}
