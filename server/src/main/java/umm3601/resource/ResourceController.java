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



    // get a resources by its ObjectId, not used by client, for potential future use
    public String getResource(String id) {
        FindIterable<Document> jsonItems
            = resourceCollection
            .find(eq("_id", new ObjectId(id)));

        Iterator<Document> iterator = jsonItems.iterator();
        if (iterator.hasNext()) {
            Document resource = iterator.next();
            return resource.toJson();
        } else {
            // We didn't find the desired item
            return null;
        }
    }


    // Helper method which iterates through the collection, receiving all
    // documents if no query parameter is specified. If the resources parameter is
    // specified, then the collection is filtered so only documents of that
    // specified resources are found.
    public String getResources(Map<String, String[]> queryParams) {

        Document filterDoc = new Document();

        // "resource" will be a key to a string object, where the object is
        // what we get when people enter their resources as a text body.
        // "resource" is the name of the resource
        if (queryParams.containsKey("resourceName")) {
            String targetContent = (queryParams.get("resourceName")[0]);
            Document contentRegQuery = new Document();
            contentRegQuery.append("$regex", targetContent);
            contentRegQuery.append("$options", "i");
            filterDoc = filterDoc.append("resourceName", contentRegQuery);
        }

        // Phone is the phone number, also a String
        if (queryParams.containsKey("resourcePhone")) {
            String targetContent = (queryParams.get("resourcePhone")[0]);
            Document contentRegQuery = new Document();
            contentRegQuery.append("$regex", targetContent);
            contentRegQuery.append("$options", "i");
            filterDoc = filterDoc.append("resourcePhone", contentRegQuery);
        }

        // url is the title of the resource
        if (queryParams.containsKey("resourceUrl")) {
            String targetContent = (queryParams.get("resourceUrl")[0]);
            Document contentRegQuery = new Document();
            contentRegQuery.append("$regex", targetContent);
            contentRegQuery.append("$options", "i");
            filterDoc = filterDoc.append("resourceUrl", contentRegQuery);
        }

        // the body of the resource
        if (queryParams.containsKey("resourceBody")) {
            boolean targetStatus = Boolean.parseBoolean(queryParams.get("resourceBody")[0]);
            filterDoc = filterDoc.append("resourceBody", targetStatus);
        }

        // FindIterable comes from mongo, Document comes from Gson
        FindIterable<Document> matchingResources = resourceCollection.find(filterDoc);

        return JSON.serialize(matchingResources);
    }


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
