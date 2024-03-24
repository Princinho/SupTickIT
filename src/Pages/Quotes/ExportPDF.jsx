import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
export default function ExportPDF() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={{ width: "100%", height: "800px" }}>
      <div className="d-flex justify-content-end py-2">
        <button
          type="button"
          onClick={() =>
            navigate(-1, {
              state: location.state,
            })
          }
          className="btn m-0 p-2 mx-2 btn-xs btn bg-gradient-info "
        >
          <i className="bi bi-arrow-bar-left"></i> Retour
        </button>
      </div>
      {/* <div className="flex-row-reverse">
            <button className="btn bg-gradient-info w-20 mb-0" onClick={() => navigate('/clients', {
                state: location.state
            })}>Retour</button>
        </div> */}
      <PDFViewer width={"100%"} height={700}>
        <Exporter data={location.state} />
      </PDFViewer>
    </div>
  );
}

// Create styles

// Create Document Component
function Exporter({ data }) {
  const { entry, vehicle, customer, parts } = data;
  console.log(parts);

  const styles = StyleSheet.create({});
  console.log(data, "state");
  return (
    <Document>
      <Page style={{ padding: 10, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            border: "1px solid #555",
            borderBottom: "2px solid black",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              borderRight: "1px solid black",
              padding: "10px",
              flex: 2,
            }}
          >
            <Text style={{ fontSize: 12, color: "#555" }}>Atelier</Text>
            <Text
              style={{
                fontSize: "20px",
              }}
            >
              CACYD-FILS
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              flex: 3,
              padding: "10px",
            }}
          >
            <Text style={{ paddingBottom: "4px", fontSize: 10 }}>
              Diagnostique et detection de pannes
            </Text>
            <Text style={{ paddingBottom: "4px", fontSize: 10 }}>
              Programmation de calculateur, clés et autres systèmes
              électroniques
            </Text>
            <Text style={{ paddingBottom: "4px", fontSize: 10 }}>
              Tous travaux de mécanique, Tôlerie, de peinture, chaudronnerie, &
              Divers
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: "10px",
            alignItems: "flex-end",
            gap: "10px",
          }}
        >
          <Text
            style={{
              fontSize: "20px",
            }}
          >
            FACTURE PROFORMA
          </Text>
          <Text style={{ fontSize: "14px" }}>
            N°: ____{entry.referenceNumber}____du____
            {new Date(entry.date).toLocaleDateString()}________
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: "10px",
            border: "1px solid black",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: "5px",
              borderRight: "1px solid black",
            }}
          >
            <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
              Client :
            </Text>
            <Text style={{ fontSize: "12px" }}>
              {customer?.firstname + " " + customer?.lastname}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "column", padding: "5px" }}>
            <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
              Marque/Modèle/Année/Couleur :
            </Text>
            <Text style={{ fontSize: "12px" }}>
              {vehicle.make}
              {"/"}
              {vehicle.model}
              {"/"}
              {vehicle.year}
              {"/"}
              {vehicle.color}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            border: "1px solid black",
            borderTop: "none",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              padding: "5px",
              borderRight: "1px solid black",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                Immatriculation :
              </Text>
              <Text style={{ fontSize: "12px" }}>{vehicle?.plateNumber}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                borderRight: "1px solid black",
                padding: "5px",
                flex: 1,
              }}
            >
              <Text style={{ fontSize: "10px", marginBottom: "5px" }}>
                Kilométrage :
              </Text>
              <Text style={{ fontSize: "12px" }}>{225091}KM</Text>
            </View>
          </View>
          <View style={{ flex: 2, flexDirection: "column", padding: "5px" }}>
            <Text style={{ fontSize: "10px", marginBottom: "5px" }}>VIN</Text>
            <Text style={{ fontSize: "12px" }}>{vehicle?.vin}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            border: "1px solid black",
            borderBottom: "none",
            marginTop: "20px",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#555",
              color: "white ",
              borderBottom: "1px solid black",
            }}
          >
            <View
              style={{
                flex: 8,
                textAlign: "center",
                borderRight: "1px solid black",
              }}
            >
              <Text style={{ color: "white" }}>Désignation</Text>
            </View>
            <View
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid black",
              }}
            >
              <Text style={{ color: "white" }}>Qté</Text>
            </View>
            <View
              style={{
                flex: 3,
                textAlign: "center",
                borderRight: "1px solid black",
              }}
            >
              <Text style={{ color: "white" }}>P.U.</Text>
            </View>
            <View style={{ flex: 4, textAlign: "center" }}>
              <Text style={{ color: "white" }}>Montant HT</Text>
            </View>
          </View>
          {entry?.quoteDetails?.map((detail, index) => (
            <View
              key={detail?.partId}
              style={{
                flexDirection: "row",
                borderBottom: "1px solid black",
              }}
            >
              <View
                style={{
                  flex: 8,
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "14px" }}>
                  {parts?.find((p) => p.id == detail?.partId).name}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "14px" }}>{detail?.quantity}</Text>
              </View>
              <View
                style={{
                  flex: 3,
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ fontSize: "14px" }}>{detail?.pricePerUnit}</Text>
              </View>
              <View style={{ flex: 4, textAlign: "center" }}>
                <Text style={{ fontSize: "14px" }}>
                  {detail?.pricePerUnit * detail?.quantity}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
Exporter.propTypes = PropTypes.array;
