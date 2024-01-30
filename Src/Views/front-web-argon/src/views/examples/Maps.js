
import React from "react";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const MapWrapper = () => {
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 12,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Light Bootstrap Dashboard PRO React!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Light Bootstrap Dashboard PRO React</h2>' +
      "<p>A premium Admin for React-Bootstrap, Bootstrap, React, and React Hooks.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  }, []);
  return (
    <>
      <div
        style={{ height: `600px` }}
        className="map-canvas"
        id="map-canvas"
        ref={mapRef}
      ></div>
    </>
  );
};

const Maps = () => {
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
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
