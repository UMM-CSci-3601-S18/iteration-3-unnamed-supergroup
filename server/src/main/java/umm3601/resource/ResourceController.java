package umm3601.resource;

import umm3601.SuperController;
import java.util.Date;
import com.google.gson.Gson;
import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import java.util.Iterator;
import java.util.Map;
import static com.mongodb.client.model.Filters.eq;

public class ResourceController extends SuperController {

    private final Gson gson;
    private MongoDatabase database;
    // resourceCollection is the collection that the resources data is in.
    private final MongoCollection<Document> resourceCollection;


    public ResourceController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        resourceCollection = database.getCollection("resources");
    }

    //Song: I noticed that you added an "email" category in database, do you want me also change that in client?
    //??
    /*
    public String addNewResponse(String nameOfResponse, String link, String email, String phone, String body) {
        Document newResponse = new Document();
        newResponse.append("name", nameOfResponse);
        newResponse.append("url", link);
        newResponse.append("body", body);
        newResponse.append("phone", phone);
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
    */



    /**
     * Helper method which appends received user information to the to-be added document
     *
     * @param resourceName
     * @param resourcePhone
     * @param resourceUrl
     * @param resourceBody
     * @return boolean after successfully or unsuccessfully adding a user
     */
    // As of now this only adds the resource, but you can separate multiple arguments
    // by commas as we add them.
    public String addNewResource(String resourceName, String resourcePhone, String resourceUrl, String resourceBody) {

        // makes the search Document key-pairs
        Document newResource = new Document();
        newResource.append("resourceName", resourceName);
        newResource.append("resourcePhone", resourcePhone);
        newResource.append("resourceUrl", resourceUrl);
        newResource.append("resourceBody", resourceBody);
        // Append new resources here

        try {
            resourceCollection.insertOne(newResource);
            ObjectId id = newResource.getObjectId("_id");

            System.err.println("Successfully added new resource [_id=" + id + ", resourceName=" + resourceName + ", resourcePhone=" + resourcePhone + ", resourceUrl=" + resourceUrl + ']');
            return JSON.serialize(id);
        } catch(MongoException me) {
            me.printStackTrace();
            return null;
        }
    }


}
