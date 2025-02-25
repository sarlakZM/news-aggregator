import { PropsType } from "../types/app.type";
import StyledDiv from "./ErrorMessage.styles";


const ErrorMessage = ({ children, loading }: PropsType) => {
  return (
    <StyledDiv>
      {children}
      {
         !loading && <img src={`./no-results.gif?`} />
      }
    </StyledDiv>
  );
};

export default ErrorMessage;
