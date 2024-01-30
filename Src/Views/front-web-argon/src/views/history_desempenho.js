/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    Media,
    Progress,
    Table,
    Container,
    Row,
    Button
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  
  const Desempenho = () => {
    return (
      <>
        <Header exibnote={false} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Desempenho</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Prova</th>
                      <th scope="col">última nota</th>
                      <th scope="col">Recomendação</th>
                      <th scope="col">Importância</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                              <i className="ni ni-ruler-pencil" />
                            </div>
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Linguagens e Códigos
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>678.8</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-yellow" />
                          Priorizar
                        </Badge>
                      </td>
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
                      <td className="d-flex align-items-center">
                        <div className="mt-5"></div>
                            <Button color="primary" size="sm" type="button">
                                Hab (PDF)
                            </Button>

                            <Button block color="success" size="sm" type="button">
                                Listas Treino e Revisão
                            </Button>
                            
                            <Button   color="info" size="sm" type="button">
                                Hab (Anki)
                            </Button>
                        <div/>                        
                      </td>
                      
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                    <i className="ni ni-istanbul" />
                  </div>
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Ciências Humanas
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>715.5</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-warning" />
                          Revisar
                        </Badge>
                      </td>
                      
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
                      <td className="d-flex align-items-center">
                        <div className="mt-5"></div>
                            <Button color="primary" size="sm" type="button">
                                Hab (PDF)
                            </Button>

                            <Button block color="success" size="sm" type="button">
                                Listas Treino e Revisão
                            </Button>
                            
                            <Button   color="info" size="sm" type="button">
                                Hab (Anki)
                            </Button>
                        <div/>                        
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="ni ni-atom" />
                        </div>
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">Ciências da Natureza</span>
                          </Media>
                        </Media>
                      </th>
                      <td>722.68</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-info" />
                          Treinar e Revisar
                        </Badge>
                      </td>
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
                      <td className="d-flex align-items-center">
                        <div className="mt-5"></div>
                            <Button color="primary" size="sm" type="button">
                                Hab (PDF)
                            </Button>

                            <Button block color="success" size="sm" type="button">
                                Listas Treino e Revisão
                            </Button>
                            
                            <Button   color="info" size="sm" type="button">
                                Hab (Anki)
                            </Button>
                        <div/>                        
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
       
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    <i className="fas fa-percent" />
                  </div>
                
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Matemática
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>830.7</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-danger" />
                          Treinar e Revisar
                        </Badge>
                      </td>
                      
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
                      <td className="d-flex align-items-center">
                        <div className="mt-5"></div>
                            <Button color="primary" size="sm" type="button">
                                Hab (PDF)
                            </Button>

                            <Button block color="success" size="sm" type="button">
                                Listas Treino e Revisão
                            </Button>
                            
                            <Button   color="info" size="sm" type="button">
                                Hab (Anki)
                            </Button>
                        <div/>                        
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                  <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                    <i className="ni ni-align-center" />
                  </div>
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Redação
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>980</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          Revisar Competências
                        </Badge>
                      </td>
                      
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
                      <td className="d-flex align-items-center">
                        <div className="mt-5"></div>

                            <Button block color="warning" size="sm" type="button">
                                Escrever Redação
                            </Button>
                            
                        <div/>                        
                      </td>
                    </tr>
                  </tbody>
                </Table>
  
              </Card>
            </div>
          </Row>
          {/* Dark table */}
         
        </Container>
      </>
    );
  };
  
  export default Desempenho;
  