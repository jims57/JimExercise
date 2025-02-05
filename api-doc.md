# OCR 文字识别 API 文档

## 接口说明
该接口提供图片文字识别功能，支持多种语言的文字识别。

### 接口详情
- **接口路径**: `/ocr`
- **请求方式**: POST
- **Content-Type**: application/json

### 支持的语言
- ch: 中文
- en: 英文
- fr: 法语
- german: 德语
- korean: 韩语
- japan: 日语

## 请求参数

| 参数名 | 类型   | 必填 | 说明                                                    |
|--------|--------|------|-------------------------------------------------------|
| image  | string | 是   | 图片的base64编码字符串，支持带前缀和不带前缀的base64格式 |
| lang   | string | 否   | 识别语言，默认为"ch"（中文）                           |

## 响应参数

| 参数名       | 类型    | 说明                     |
|-------------|---------|------------------------|
| status_code | integer | 状态码                   |
| message     | string  | 响应信息                 |
| data        | object  | 识别结果数据              |
| error       | string  | 错误信息（仅在出错时返回）  |

### data 字段说明
- results: 文字位置坐标数组（每组坐标包含文字框的四个顶点坐标 [[x1,y1], [x2,y2], [x3,y3], [x4,y4]]）
- texts: 识别出的文字数组

## 示例

### 请求示例
```json
{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "lang": "ch"
}
```

### 成功响应示例
```json
{
    "status_code": 200,
    "message": "Success",
    "data": {
        "results": [
            [
                [291.0, 170.0],
                [1080.0, 170.0],
                [1080.0, 274.0],
                [291.0, 274.0]
            ],
            [
                [224.0, 329.0],
                [1065.0, 329.0],
                [1065.0, 376.0],
                [224.0, 376.0]
            ]
        ],
        "texts": [
            "小度智能屏×8",
            "小度在家陪伴在家千万家庭都说好"
        ]
    },
    "error": null
}
```

### 无文字识别结果响应示例
```json
{
    "status_code": 200,
    "message": "Success",
    "data": {
        "results": [],
        "texts": [],
        "warning": "No text detected"
    }
}
```

### 错误响应示例
```json
{
    "status_code": 400,
    "message": "Invalid input",
    "error": "Invalid base64 encoding"
}
```

```json
{
    "status_code": 400,
    "message": "Invalid language code",
    "error": "Supported languages are: ch, en, fr, german, korean, japan"
}
```

```json
{
    "status_code": 400,
    "message": "Invalid input",
    "error": "Empty base64 string"
}
```

```json
{
    "status_code": 400,
    "message": "Invalid input",
    "error": "Invalid image format"
}
```

```json
{
    "status_code": 500,
    "message": "Internal server error",
    "error": "Failed to initialize OCR model"
}
```

## 错误码说明

| 状态码 | 说明                                          |
|--------|---------------------------------------------|
| 200    | 请求成功                                      |
| 400    | 请求参数错误（包括：无效的base64编码、不支持的语言、空base64字符串、无效的图片格式） |
| 500    | 服务器内部错误（包括：OCR模型初始化失败、图片处理错误等）  |

## 注意事项
1. base64图片编码支持带前缀（如：`data:image/png;base64,`）和不带前缀的格式
2. 建议图片大小不要超过4MB
3. 支持的图片格式包括：PNG、JPEG、JPG等常见图片格式
4. 如果图片中没有检测到文字，会返回空数组，并附带警告信息
5. 坐标信息说明：
   - results中的每个数组包含4个坐标点，表示检测到文字的矩形框四个顶点
   - 坐标点按顺序为：左上、右上、右下、左下
   - 坐标系以图片左上角为原点(0,0)，向右为x轴正方向，向下为y轴正方向

## 调用示例（Python）
```python
import requests
import base64

# 读取图片文件并转换为base64
with open("example.png", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

# 准备请求数据
data = {
    "image": encoded_string,
    "lang": "ch"
}

# 发送请求
response = requests.post("http://your-api-domain/ocr", json=data)

# 处理响应
result = response.json()
if result["status_code"] == 200:
    # 处理识别结果
    texts = result["data"]["texts"]
    print("识别的文字:", texts)
    # 输出示例：
    # 识别的文字: ['小度智能屏×8', '小度在家陪伴在家千万家庭都说好']
else:
    print("错误:", result["error"])
```

## 调用示例（Objective-C）
```objective-c
#import <Foundation/Foundation.h>

// 读取图片并转换为base64
NSString* imageToBase64(UIImage* image) {
    NSData *imageData = UIImagePNGRepresentation(image);
    return [imageData base64EncodedStringWithOptions:0];
}

// 发送OCR请求
- (void)performOCR {
    // 准备图片
    UIImage *image = [UIImage imageNamed:@"example.png"];
    NSString *base64String = imageToBase64(image);
    
    // 准备请求数据
    NSDictionary *requestBody = @{
        @"image": base64String,
        @"lang": @"ch"
    };
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:requestBody
                                                      options:0
                                                        error:&error];
    
    // 创建请求
    NSURL *url = [NSURL URLWithString:@"http://your-api-domain/ocr"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    request.HTTPMethod = @"POST";
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    request.HTTPBody = jsonData;
    
    // 发送请求
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                          completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error) {
            NSLog(@"Error: %@", error);
            return;
        }
        
        // 处理响应
        NSError *jsonError;
        NSDictionary *result = [NSJSONSerialization JSONObjectWithData:data
                                                             options:0
                                                               error:&jsonError];
        
        if ([result[@"status_code"] integerValue] == 200) {
            // 处理识别结果
            NSArray *texts = result[@"data"][@"texts"];
            NSLog(@"识别的文字: %@", texts);
        } else {
            NSLog(@"错误: %@", result[@"error"]);
        }
    }];
    
    [task resume];
}
```

## 调用示例（Android Java）
```java
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import java.io.ByteArrayOutputStream;
import okhttp3.*;
import org.json.JSONObject;
import java.io.IOException;

public class OCRExample {
    private static final String API_URL = "http://your-api-domain/ocr";
    private OkHttpClient client = new OkHttpClient();

    // 将Bitmap转换为Base64
    private String bitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }

    // 执行OCR识别
    public void performOCR(Bitmap image) {
        // 准备请求数据
        String base64Image = bitmapToBase64(image);
        
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("image", base64Image);
            requestBody.put("lang", "ch");
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

        // 创建请求
        RequestBody body = RequestBody.create(
            MediaType.parse("application/json"), requestBody.toString());
            
        Request request = new Request.Builder()
            .url(API_URL)
            .post(body)
            .build();

        // 发送请求
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (!response.isSuccessful()) {
                    throw new IOException("Unexpected code " + response);
                }

                String responseData = response.body().string();
                try {
                    JSONObject result = new JSONObject(responseData);
                    if (result.getInt("status_code") == 200) {
                        // 处理识别结果
                        JSONObject data = result.getJSONObject("data");
                        JSONArray texts = data.getJSONArray("texts");
                        
                        // 在主线程更新UI
                        runOnUiThread(() -> {
                            StringBuilder sb = new StringBuilder();
                            for (int i = 0; i < texts.length(); i++) {
                                try {
                                    sb.append(texts.getString(i)).append("\n");
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                            // 更新UI显示识别结果
                            // textView.setText(sb.toString());
                        });
                    } else {
                        String error = result.getString("error");
                        // 处理错误
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    // 示例调用
    public void example() {
        // 从资源加载图片
        Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.example);
        performOCR(bitmap);
    }
}
```

## 响应结果说明
在成功的响应示例中：
1. `results`数组包含了每个识别文本的位置信息：
   - 第一个文本 "小度智能屏×8" 的位置坐标为：
     - 左上角：(291.0, 170.0)
     - 右上角：(1080.0, 170.0)
     - 右下角：(1080.0, 274.0)
     - 左下角：(291.0, 274.0)
   - 第二个文本 "小度在家陪伴在家千万家庭都说好" 的位置坐标为：
     - 左上角：(224.0, 329.0)
     - 右上角：(1065.0, 329.0)
     - 右下角：(1065.0, 376.0)
     - 左下角：(224.0, 376.0)
2. `texts`数组按顺序包含了识别出的文字内容

这些坐标信息可以用于在原图上标注或定位文字位置，对于需要进行图文分析的应用场景非常有用。
