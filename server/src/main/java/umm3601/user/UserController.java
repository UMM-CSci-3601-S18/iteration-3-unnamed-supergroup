package umm3601.user;

import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import umm3601.SuperController;

import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

/**
 * Controller that manages requests for info about users.
 */
public class UserController extends SuperController {

    /**
     * Construct a controller for users.
     *
     * @param database the database containing user data
     */
    public UserController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        collection = database.getCollection("users");
    }

//    /**
//     * Helper method that gets a single user specified by the `id`
//     * parameter in the request.
//     *
//     * @param id the Mongo ID of the desired user
//     * @return the desired user as a JSON object if the user with that ID is found,
//     * and `null` if no user with that ID is found
//     */
//    public String getUser(String id) {
//        FindIterable<Document> jsonUsers
//            = collection
//            .find(eq("_id", new ObjectId(id)));
//
//        Iterator<Document> iterator = jsonUsers.iterator();
//        if (iterator.hasNext()) {
//            Document user = iterator.next();
//            return user.toJson();
//        } else {
//            // We didn't find the desired user
//            return null;
//        }
//    }
//
//
//    /** Helper method which iterates through the collection, receiving all
//     * documents if no query parameter is specified. If the age query parameter
//     * is specified, then the collection is filtered so only documents of that
//     * specified age are found.
//     *
//     * @param queryParams
//     * @return an array of Users in a JSON formatted string
//     */
//    public String getUsers(Map<String, String[]> queryParams) {
//
//        Document filterDoc = new Document();
//
//        if (queryParams.containsKey("age")) {
//            int targetAge = Integer.parseInt(queryParams.get("age")[0]);
//            filterDoc = filterDoc.append("age", targetAge);
//        }
//
//        if (queryParams.containsKey("company")) {
//            String targetContent = (queryParams.get("company")[0]);
//            Document contentRegQuery = new Document();
//            contentRegQuery.append("$regex", targetContent);
//            contentRegQuery.append("$options", "i");
//            filterDoc = filterDoc.append("company", contentRegQuery);
//        }
//
//        //FindIterable comes from mongo, Document comes from Gson
//        FindIterable<Document> matchingUsers = collection.find(filterDoc);
//
//        return JSON.serialize(matchingUsers);
//    }


    public String addNewUser(String name, String email, String date) {

        Document newUser = new Document();
        newUser.append("name", name);
        newUser.append("email", email);
        newUser.append("creation_date", date);

        try {
            collection.insertOne(newUser);
            ObjectId id = newUser.getObjectId("_id");
            System.err.println("Successfully added new user [_id=" + id + ", name=" + name + " email=" + email + " creation_date=" + date + ']');
            // return JSON.serialize(newUser);
            return JSON.serialize(id);
        } catch(MongoException me) {
            me.printStackTrace();
            return null;
        }
    }
}
