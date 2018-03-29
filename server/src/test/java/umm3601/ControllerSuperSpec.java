package umm3601;

import org.bson.BsonArray;
import org.bson.BsonObjectId;
import org.bson.Document;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;

import java.util.Arrays;

public abstract class ControllerSuperSpec {
    // http://stackoverflow.com/questions/34436952/json-parse-equivalent-in-mongo-driver-3-x-for-java
    protected BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry
            = CodecRegistries.fromProviders(Arrays.asList(
            new ValueCodecProvider(),
            new BsonValueCodecProvider(),
            new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }

    protected ObjectId parseObjectId(String json) {
        JsonReader jsonReader = new JsonReader(json);
        ObjectIdCodec reader = new ObjectIdCodec();
        return reader.decode(jsonReader, DecoderContext.builder().build());
    }
}
