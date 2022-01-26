const express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://localhost:27017/";
const DATABASE_NAME = "mydb";
const cors = require("cors");
// const router = express.Router();
const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
app.use(express.json());
var database, collection;

app.listen(5000, () => {
  MongoClient.connect(CONNECTION_URL, (error, client) => {
    if (error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("userBasedGraph");
    console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});



app.post("/fetch_device_details", (request, response) => {
  collection.insert(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    console.log(result);
    console.log("Insertion successful");
    response.send(result.insertedIds);
  });
});

app.get("/get_user_graph_based_on_location", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    console.log(result.length);
    let out_obj = {
      labels: [],
      datasets: [
        {
          label: "Location",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    };

    if (result && result.length) {
      for (let i = 0; i < result.length; i++) {
        let single_val = result[i];
        if (out_obj.labels.indexOf(single_val.city) === -1) {
          out_obj.labels.push(single_val.city);
          out_obj.datasets[0].data[out_obj.labels.length - 1] = 1;
          out_obj.datasets[0].backgroundColor[out_obj.labels.length - 1] = random_rgba();
            out_obj.datasets[0].borderColor =  out_obj.datasets[0].backgroundColor;
        } else {
          out_obj.datasets[0].data[out_obj.labels.indexOf(single_val.city)] =
            out_obj.datasets[0].data[out_obj.labels.indexOf(single_val.city)]++;
        }
      }
    }

    response.send(out_obj);
  });
});

app.get("/get_device_tracking_details", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    console.log(result.length);
    let out_obj = {
      labels: ["Desktop", "Tablet", "Mobile"],
      datasets: [
        {
          label: "Total devices visited " + result.length,
          data: [0, 0, 0],
          borderColor: random_rgba(),
          backgroundColor: random_rgba(),
        },
      ],
      summary: null,
    };

    if (result && result.length) {
      for (let i = 0; i < result.length; i++) {
        let single_val = result[i];
        if (single_val.isDesktop) {
          out_obj.datasets[0].data[0]++;
        }
        if (single_val.isTablet) {
          out_obj.datasets[0].data[1]++;
        }
        if (single_val.isMobileOnly) {
          out_obj.datasets[0].data[2]++;
        }
      }
      out_obj.summary =
        "Desktop: " +
        (out_obj.datasets[0].data[0] / result.length) * 100 +
        " %, " +
        "Tablet: " +
        (out_obj.datasets[0].data[1] / result.length) * 100 +
        " %, " +
        "Mobile: " +
        (out_obj.datasets[0].data[2] / result.length) * 100 +
        " % ";
    }
    console.log(out_obj.summary);
    response.send(out_obj);
  });
});

app.get("/get_table_details", (request, response) => {
    collection.find({}).toArray((error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
    });
  });

app.get("/get_device_percentage", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    console.log(result.length);
    let out_obj = {
      labels: ["Desktop", "Tablet", "Mobile"],
      datasets: [
        {
          label: "Total devices visited " + result.length,
          data: [0, 0, 0],
          borderColor: random_rgba(),
          backgroundColor: random_rgba(),
        },
      ],
    };

    if (result && result.length) {
      for (let i = 0; i < result.length; i++) {
        let single_val = result[i];
        if (single_val.isDesktop) {
          out_obj.datasets[0].data[0]++;
        }
        if (single_val.isTablet) {
          out_obj.datasets[0].data[1]++;
        }
        if (single_val.isMobileOnly) {
          out_obj.datasets[0].data[2]++;
        }
      }
    }
    response.send(out_obj);
  });
});

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

// const Express = require("express");
// const BodyParser = require("body-parser");
// const MongoClient = require("mongodb").MongoClient;

// const CONNECTION_URL = "";
// const DATABASE_NAME = "test1";
// // router();
// var app = Express();
// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({ extended: true }));
// var database, collection;

// app.listen(5000, () => {
//     MongoClient.connect(
//         CONNECTION_URL,
//         { useNewUrlParser: true },
//         (error, client) => {
//             if (error) {
//                 throw error;
//             }
//             database = client.db(DATABASE_NAME);
//             collection = database.collection("personnel");
//             console.log("Connected to `" + DATABASE_NAME + "`!");
//         }
//     );
// });
// app.post("/fetch_device_details", (request, response) => {
//     console.log(request.body);
//     collection.insert(request.body, (error, result) => {
//         if (error) {
//             return response.status(500).send(error);
//         }
//         response.send(result.result);
//     });
// });
