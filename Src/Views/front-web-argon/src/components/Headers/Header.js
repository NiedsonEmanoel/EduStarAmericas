
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = (props) => {

  const renderizarNotas = (props) => {
    if(props.exibnote != false){
      return(<> <>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Linguagens e códigos 
                  </CardTitle>
                  <br/>
                  <span className="h2 font-weight-bold mb-0">{props.noteLC}</span>
                  <br/><br/>
                  <span className="h4"><b>Você acertou {props.ac_from_lc} de {props.ac_to_lc} questões</b></span>
                  <br/>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                    <i className="ni ni-ruler-pencil" />
                  </div>
                </Col>
              </Row>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className={"mr-2 text-"+props.comment_color_lc}>
                  <i className={'fas '+props.comment_arrow_lc} /> {props.comment_lc}
                </span>{" "}
                <br/>
                <span className="text-nowrap">Realizado em {props.date_simu_lc}</span>
              </p>
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Ciências Humanas 
                  </CardTitle>
                  <br/>
                  <span className="h2 font-weight-bold mb-0">{props.noteCH}</span>
                  <br/><br/>
                  <span className="h4"><b>Você acertou {props.ac_from_ch} de {props.ac_to_ch} questões</b></span>
                  <br/>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                    <i className="ni ni-istanbul" />
                  </div>
                </Col>
              </Row>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className={"mr-2 text-"+props.comment_color_ch}>
                  <i className={'fas '+props.comment_arrow_ch} /> {props.comment_ch}
                </span>{" "}
                <br/>
                <span className="text-nowrap">Realizado em {props.date_simu_ch}</span>
              </p>
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Ciências da Natureza 
                  </CardTitle>
                  <br/>
                  <span className="h2 font-weight-bold mb-0">{props.noteCN}</span>
                  <br/><br/>
                  <span className="h4"><b>Você acertou {props.ac_from_cn} de {props.ac_to_cn} questões</b></span>
                  <br/>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                    <i className="ni ni-atom" />
                  </div>
                </Col>
              </Row>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className={"mr-2 text-"+props.comment_color_cn}>
                  <i className={'fas '+props.comment_arrow_cn} /> {props.comment_cn}
                </span>{" "}
                <br/>
                <span className="text-nowrap">Realizado em {props.date_simu_cn}</span>
              </p>
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    MATEMÁTICA {'⠀'}
                  </CardTitle>
                  <br/>
                  <span className="h2 font-weight-bold mb-0">{props.noteMT}</span>
                  <br/><br/>
                  <span className="h4"><b>Você acertou {props.ac_from_mt} de {props.ac_to_mt} questões</b></span>
                  <br/>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    <i className="fas fa-percent" />
                  </div>
                </Col>
              </Row>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className={"mr-2 text-"+props.comment_color_mt}>
                  <i className={'fas '+props.comment_arrow_mt} /> {props.comment_mt}
                </span>{" "}
                <br/>
                <span className="text-nowrap">Realizado em {props.date_simu_mt}</span>
              </p>
            </CardBody>
          </Card>
        </Col>
      </></>);
    }else{
      return(<></>);
    }
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
             {renderizarNotas(props)}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
