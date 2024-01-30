
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Media,
  Badge,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";



// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";


const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  //Gráfico preto, assim que tem que vir da api
  const dattApi = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Performance",
        data: [20, 40, 60, 130, 85, 90, 110, 50],
      },
    ],
  }

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const retName = (activeNavs) =>{ 
    if(activeNavs===1){return 'Linguagens'}
    if(activeNavs===2){return 'Humanas'}
    if(activeNavs===3){return 'Natureza'}
    if(activeNavs===4){return 'Matemática'}
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    if (index == 3){index = 1}
    if (index == 4){index = 2}
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header
        exibnote={true}

        noteLC={686.8}
        ac_from_lc={38}
        ac_to_lc={45}
        comment_lc={'Sua nota subiu em 40 pontos'}
        comment_arrow_lc={'fa-arrow-up'} // arrow-down
        comment_color_lc={'success'} // danger
        date_simu_lc={'29/01/2024'}

        noteCH={671}
        ac_from_ch={38}
        ac_to_ch={45}
        comment_ch={'Sua nota subiu em 40 pontos'}
        comment_arrow_ch={'fa-arrow-up'} // arrow-down
        comment_color_ch={'success'} // danger
        date_simu_ch={'29/01/2024'}

        noteCN={678.9}
        ac_from_cn={27}
        ac_to_cn={45}
        comment_cn={'Sua nota subiu em 40 pontos'}
        comment_arrow_cn={'fa-arrow-up'} // arrow-down
        comment_color_cn={'success'} // danger
        date_simu_cn={'29/01/2024'}

        noteMT={830.7}
        ac_from_mt={35}
        ac_to_mt={45}
        comment_mt={'Sua nota subiu em 40 pontos'}
        comment_arrow_mt={'fa-arrow-up'} // arrow-down
        comment_color_mt={'success'} // danger
        date_simu_mt={'29/01/2024'}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>

          <Col className="mb-5 mb-xl-0" xl="8">

            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
              <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Linguagens</span>
                          <span className="d-md-none">LC</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Humanas</span>
                          <span className="d-md-none">CH</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 3,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 3)}
                        >
                          <span className="d-none d-md-block">Natureza</span>
                          <span className="d-md-none">CN</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 4,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 4)}
                        >
                          <span className="d-none d-md-block">Matemática</span>
                        </NavLink>
                      </NavItem>

                    </Nav>
                  </div>
                <Col className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Visão geral
                    </h6>
                    <h3 className="text-white mb-0">Evolução na TRI em {retName(activeNav)}</h3>
                  </div>
                </Col>
              </CardHeader>


              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>

            </Card>

          </Col>


          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Acertos em {retName(activeNav)}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Alavancar nota</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={(e)=>{window.location.href = "/web/desempenho"}}
                    >Relatório completo
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Prova</th>
                      <th scope="col">Relevância</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                          <Media>
                            <span className="mb-0 text-sm">
                              Linguagens e Códigos
                            </span>
                          </Media>

                      </th>

                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{Math.round((1-0.55)*100,2)}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={Math.round((1-0.55)*100,2)}
                              coment={' 0.55 PORCENTAGEM ULTIMA NOTA'}
                              barClassName="bg-yellow"
                            />
                          </div>
                        </div>
                      </td>

                      
                    </tr>
                    <tr>
                      <th scope="row">

                          <Media>
                            <span className="mb-0 text-sm">
                               Humanas
                            </span>
                          </Media>

                      </th>

                      
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{Math.round((1-0.75)*100,2)}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={Math.round((1-0.75)*100,2)}
                              coment={' 0.55 PORCENTAGEM ULTIMA NOTA'}
                              barClassName="bg-warning"
                            />
                          </div>
                        </div>
                      </td>

                    </tr>
                    <tr>
                      <th scope="row">

                          <Media>
                            <span className="mb-0 text-sm">Ciências da Natureza</span>
                          </Media>

                      </th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{Math.round((1-0.15)*100,2)}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={Math.round((1-0.15)*100,2)}
                              coment={' 0.55 PORCENTAGEM ULTIMA NOTA'}
                              barClassName="bg-info"
                            />
                          </div>
                        </div>
                      </td>

                    </tr>
                    <tr>
                      <th scope="row">

                          <Media>
                            <span className="mb-0 text-sm">
                              Matemática
                            </span>
                          </Media>

                      </th>
                      
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{Math.round((1-0.55)*100,2)}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={Math.round((1-0.55)*100,2)}
                              coment={' 0.55 PORCENTAGEM ULTIMA NOTA'}
                              barClassName="bg-danger"
                            />
                          </div>
                        </div>
                      </td>

                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              Redação
                            </span>
                          </Media>
                        </Media>
                      </th>                    
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{Math.round((1-0.95)*100,2)}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={Math.round((1-0.95)*100,2)}
                              coment={' 0.55 PORCENTAGEM ULTIMA NOTA'}
                              barClassName="bg-green"
                            />
                          </div>
                        </div>
                      </td>

                    </tr>
                  </tbody>
                </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
