import { useState } from "react";
import { Container, Form, Button, Tabs, Tab } from "react-bootstrap";
import axios from "axios";

export default function LoginPage() {
  const [key, setKey] = useState("parents");
  const [parentId, setParentId] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [childId, setChildId] = useState("");
  const [childPassword, setChildPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loginData = {};
    if (key === "parents") {
      loginData = { id: parentId, password: parentPassword };
    } else if (key === "children") {
      loginData = { id: childId, password: childPassword };
    }

    try {
      // 로그인 요청, 쿠키에 JWT를 자동으로 저장하려면 withCredentials: true 사용
      const response = await axios.post("api/users/login", loginData, {
        withCredentials: true, // 쿠키를 포함한 요청을 보냄
      });

      if (response.status === 200) {
        console.log("로그인 성공!");
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "로그인 실패";
      console.error("로그인 실패:", errorMessage);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <div className="w-100 text-center mb-4">
        <h1 className="fw-bold">환영합니다! 😍</h1>
        <p>어떤 사용자이신가요?</p>
      </div>

      <Tabs
        id="login-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 w-100"
      >
        <Tab eventKey="parents" title="부모님">
          <Form className="w-100" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="parentId">
              <Form.Control
                type="text"
                placeholder="아이디를 입력해주세요"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="parentPassword">
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={parentPassword}
                onChange={(e) => setParentPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" size="lg" className="w-100" type="submit">
              로그인 하기
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="children" title="자녀">
          <Form className="w-100" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="childId">
              <Form.Control
                type="text"
                placeholder="아이디를 입력해주세요"
                value={childId}
                onChange={(e) => setChildId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="childPassword">
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={childPassword}
                onChange={(e) => setChildPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" size="lg" className="w-100" type="submit">
              로그인 하기
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
}
