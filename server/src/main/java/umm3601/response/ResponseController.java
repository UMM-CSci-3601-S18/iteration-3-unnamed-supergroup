package umm3601.response;

import com.google.gson.Gson;
import com.mongodb.MongoException;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import umm3601.SuperController;

import java.util.Date;

public class ResponseController extends SuperController {

    public ResponseController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        collection = database.getCollection("responses");
    }

    public String addNewResponse(String nameOfResponse, String link, String email) {
        Document newResponse = new Document();
        newResponse.append("name", nameOfResponse);
        newResponse.append("link", link);
        newResponse.append("email", email);

        Date now = new Date();
        newResponse.append("date", now.toString());

        try {
            collection.insertOne(newResponse);
            ObjectId id = newResponse.getObjectId("_id");
            System.err.println("Successfully added new response [_id=" +
                id + ", name=" + nameOfResponse + ", link=" +
                link + ", email=" + email + ", date=" + now + "]");
            return JSON.serialize(id);
        } catch (MongoException me) {
            me.printStackTrace();
            return null;
        }
    }
}
