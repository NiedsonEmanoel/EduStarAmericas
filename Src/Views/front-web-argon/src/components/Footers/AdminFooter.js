import { Row, Col, Nav, NavItem, NavLink, Modal, Button } from "reactstrap";
import Privacy from "components/Terms/privacy";
import { useState } from "react";
const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const toogleModal = ()=>{setOpenModal(!openModal)}

  return (
    <footer className="footer">
      <hr/>
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://www.enemaster.app.br"
              target="_blank"
              rel="noreferrer"
            >
              Enemaster.app.br
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">

          <Modal
          className=''
          isOpen={openModal}
          toggle={() => toogleModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
            Enemaster.app
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toogleModal()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Privacy Title='Política de Privacidade' Name='"Enemaster.app"' Link='https://enemaster.app.br'/>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => toogleModal()}
            >
              OK
            </Button>
          </div>
        </Modal>  

          <NavItem>
              <NavLink
                href="https://www.enemaster.app.br/sobre"
                rel="noreferrer"
                target="_blank"
              >
                Sobre
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={() => toogleModal()}>
                Política de Dados
              </NavLink>
            </NavItem>

          <NavItem>
              <NavLink
                href="https://blog.enemaster.app.br"
                rel="noreferrer"
                target="_blank"
              >
                Blog
              </NavLink>
            </NavItem>

          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
