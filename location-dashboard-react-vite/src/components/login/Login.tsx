import { useAuth } from "../../hooks/useAuth";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";

import { postLogin } from "../../api/user";

import { strings } from "../common/constants/strings.tsx";

export const Login = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    username: yup.string().required(strings.usernameValidation),
    password: yup.string().required(strings.passwordValidation),
  });

  const { login } = useAuth();

  const handleSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    postLogin({ username, password }).then((res) => {
      login(res.data.token);
    });
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        username: "",
        password: "",
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="justify-content-md-center mt-3 mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>{strings.username}</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder={strings.username}
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="justify-content-md-center mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormikPassword">
              <Form.Label>{strings.password}</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder={strings.password}
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={4}>
              <Button type="submit">{strings.login}</Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
