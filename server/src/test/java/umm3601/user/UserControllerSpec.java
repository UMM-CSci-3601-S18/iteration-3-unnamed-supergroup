package umm3601.user;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;
import umm3601.ControllerSuperSpec;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

public class UserControllerSpec extends ControllerSuperSpec{
    private UserController userController;
    private ObjectId kylesId;

    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> userDocuments = db.getCollection("users");
        userDocuments.drop();
        List<Document> testUsers = new ArrayList<>();
        testUsers.add(Document.parse("{\n" +
            "                    name: \"Ahnaf\",\n" +
            "                    email: \"ahnaf@ahnaf.com\",\n" +
            "                    creation_date: \"8/20/2015 20:00\",\n" +
            "                }"));
        testUsers.add(Document.parse("{\n" +
            "                    name: \"Aurora\",\n" +
            "                    email: \"aurora@boreal.is\",\n" +
            "                    creation_date: \"8/21/2015 20:00\",\n" +
            "                }"));
        testUsers.add(Document.parse("{\n" +
            "                    name: \"Matt\",\n" +
            "                    email: \"matt@mattmatt.com\",\n" +
            "                    creation_date: \"8/22/2015 20:00\",\n" +
            "                }"));
        testUsers.add(Document.parse("{\n" +
            "                    name: \"Ethan\",\n" +
            "                    email: \"ethan@ethan.co.uk\",\n" +
            "                    creation_date: \"8/20/2015 20:00\",\n" +
            "                }"));

        kylesId = new ObjectId();
        BasicDBObject kyle = new BasicDBObject("_id", kylesId);
        kyle = kyle.append("name", "Kyle")
            .append("email", "kyle@kyle.com")
            .append("creation_date", "11/11/2011 09:00");



        userDocuments.insertMany(testUsers);
        userDocuments.insertOne(Document.parse(kyle.toJson()));

        // It might be important to construct this _after_ the DB is set up
        // in case there are bits in the constructor that care about the state
        // of the database.
        userController = new UserController(db);
    }

    private static String getName(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("name")).getValue();
    }

    @Test
    public void getAllUsers() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = userController.getItems(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 5 users", 5, docs.size());
        List<String> names = docs
            .stream()
            .map(UserControllerSpec::getName)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedNames = Arrays.asList("Ahnaf", "Aurora", "Ethan", "Kyle", "Matt");
        assertEquals("Names should match", expectedNames, names);
    }

    @Test
    public void getEmojiById() {
        String jsonResult = userController.getItem(kylesId.toHexString());
        System.out.println(jsonResult);
        Document kyle = Document.parse(jsonResult);

        assertEquals("Name should match", "Kyle", kyle.getString("name"));
        String noJsonResult = userController.getItem(new ObjectId().toString());
        assertNull("No name should match",noJsonResult);

    }

    @Test
    public void addEmojiTest(){
        String newId = userController.addNewUser("Matt2","matt2@cloning.com","8/20/2015 14:00");

        assertNotNull("Add new user should return true when an emoji is added,", newId);
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("Matt2", new String[] { "Matt2" });
        String jsonResult = userController.getItems(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        List<String> name = docs
            .stream()
            .map(UserControllerSpec::getName)
            .sorted()
            .collect(Collectors.toList());
        assertEquals("Should return the new owner", "Matt2", name.get(5));
    }


}
