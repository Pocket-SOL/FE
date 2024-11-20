import { useState } from "react";
import { Container, Form, Button, Tabs, Tab } from "react-bootstrap";

export default function LoginPage() {
  const [key, setKey] = useState("parents");
  const [parentId, setParentId] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [childId, setChildId] = useState("");
  const [childPassword, setChildPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key === "parents") {
      // 부모 로그인 처리
      console.log("부모 아이디:", parentId);
      console.log("부모 비밀번호:", parentPassword);
    } else if (key === "children") {
      // 자녀 로그인 처리
      console.log("자녀 아이디:", childId);
      console.log("자녀 비밀번호:", childPassword);
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
          <Form className="w-100">
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
          </Form>
        </Tab>
        <Tab eventKey="children" title="자녀">
          <Form className="w-100">
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
          </Form>
        </Tab>
      </Tabs>
      <Button
        variant="primary"
        size="lg"
        className="w-100"
        onClick={handleSubmit}
      >
        로그인 하기
      </Button>
    </Container>
  );
}
