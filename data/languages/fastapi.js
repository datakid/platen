export default {
  id: "fastapi",
  name: "FastAPI",
  short: "FA",
  pigment: "fastapi",
  family: "python",
  version: "0.162",
  lexer: "python",
  indent: 4,
  topics: [
    {
      id: "app-routes",
      n: 1,
      title: "app & routes",
      concepts: [
        {
          id: "create-app", n: 1, title: "creating the app", level: 1,
          gloss: "Creates a FastAPI application object that collects every route.",
          examples: [
            { code: `app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "ok"}`, notes: [{ at: "FastAPI()", text: "usual fastapi imports assumed" }, { at: "@app.get", text: "registers a get route" }] },
            { code: `app = FastAPI(title="Orders API", version="1.2.0")

@app.get("/health")
def health():
    return {"healthy": True}`, notes: [{ at: "title=", text: "shown in the docs" }, { at: "version=", text: "reported in openapi.json" }] },
            { code: `app = FastAPI(docs_url="/documentation", redoc_url=None)

@app.get("/users")
def list_users():
    return [{"id": 1, "name": "Ada"}, {"id": 2, "name": "Grace"}]`, notes: [{ at: "docs_url", text: "moves swagger ui" }, { at: "redoc_url=None", text: "turns redoc off" }] },
            { code: `app = FastAPI(openapi_url=None)

@app.get("/internal/status")
def internal_status():
    return {"queue": 0}`, notes: [{ at: "openapi_url=None", text: "no schema and no docs" }] }
          ]
        },
        {
          id: "http-methods", n: 2, title: "http methods", level: 1,
          gloss: "Binds HTTP methods to functions with the get, post, put and delete decorators.",
          examples: [
            { code: `app = FastAPI()
@app.get("/items")
def list_items():
    return ["pen", "notebook"]

@app.post("/items")
def create_item():
    return {"created": True}`, notes: [{ at: "@app.get", text: "reads data" }, { at: "@app.post", text: "creates data" }] },
            { code: `app = FastAPI()
@app.put("/users/{user_id}")
def replace_user(user_id: int):
    return {"id": user_id, "replaced": True}

@app.delete("/users/{user_id}")
def remove_user(user_id: int):
    return {"id": user_id, "deleted": True}`, notes: [{ at: "@app.put", text: "replaces a resource" }, { at: "@app.delete", text: "removes a resource" }] },
            { code: `app = FastAPI()

@app.patch("/orders/{order_id}")
def update_order(order_id: int, state: str):
    return {"id": order_id, "state": state}`, notes: [{ at: "@app.patch", text: "partial update" }] },
            { code: `app = FastAPI()

@app.api_route("/health", methods=["GET"])
def service_health():
    return {"up": True}`, notes: [{ at: "api_route", text: "methods given as a list" }] }
          ]
        },
        {
          id: "route-metadata", n: 3, title: "route metadata", level: 2,
          gloss: "Adds tags, summaries and docs text to a route through decorator arguments.",
          examples: [
            { code: `app = FastAPI()

@app.get("/items", tags=["items"], summary="List all items")
def list_items():
    return []`, notes: [{ at: "tags=", text: "groups routes in the docs" }, { at: "summary=", text: "short title in the docs" }] },
            { code: `app = FastAPI()

@app.get("/users/{user_id}", summary="Fetch one user")
def read_user(user_id: int):
    """Return the user with the given id."""
    return {"id": user_id}`, notes: [{ at: "\"\"\"Return", text: "docstring becomes the description" }] },
            { code: `app = FastAPI()

@app.get("/v1/items", deprecated=True)
def list_items_v1():
    return []`, notes: [{ at: "deprecated=True", text: "struck through in the docs" }] },
            { code: `app = FastAPI()

@app.get("/internal/metrics", include_in_schema=False)
def metrics():
    return {"requests": 1204}`, notes: [{ at: "include_in_schema=False", text: "hidden from the docs" }] }
          ]
        }
      ]
    },
    {
      id: "path-query-parameters",
      n: 2,
      title: "path & query parameters",
      concepts: [
        {
          id: "path-params", n: 1, title: "path parameters", level: 1,
          gloss: "Reads typed values from the URL path through function parameters.",
          examples: [
            { code: `app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}`, notes: [{ at: "FastAPI()", text: "usual fastapi imports assumed" }, { at: "{item_id}", text: "path variable" }, { at: "item_id: int", text: "converted and validated" }] },
            { code: `app = FastAPI()

@app.get("/users/{username}/orders/{order_id}")
def read_user_order(username: str, order_id: int):
    return {"user": username, "order": order_id}`, notes: [{ at: "{username}", text: "first path variable" }, { at: "{order_id}", text: "second path variable" }] },
            { code: `from enum import StrEnum

class Role(StrEnum):
    admin = "admin"
    member = "member"
app = FastAPI()
@app.get("/roles/{role}")
def read_role(role: Role):
    return {"role": role}`, notes: [{ at: "StrEnum", text: "only listed values are valid" }, { at: "role: Role", text: "unknown values give 422" }] },
            { code: `app = FastAPI()

@app.get("/files/{file_path:path}")
def read_file(file_path: str):
    return {"file_path": file_path}`, notes: [{ at: ":path", text: "matches slashes too" }] }
          ]
        },
        {
          id: "path-validation", n: 2, title: "path validation", level: 2,
          gloss: "Constrains path parameters with Path and Annotated metadata.",
          examples: [
            { code: `app = FastAPI()

@app.get("/orders/{order_id}")
def read_order(order_id: Annotated[int, Path(ge=1)]):
    return {"order_id": order_id}`, notes: [{ at: "Path(ge=1)", text: "must be 1 or more" }] },
            { code: `app = FastAPI()

@app.get("/products/{product_id}")
def read_product(product_id: Annotated[int, Path(gt=0, le=9999)]):
    return {"product_id": product_id}`, notes: [{ at: "gt=0", text: "greater than zero" }, { at: "le=9999", text: "at most 9999" }] },
            { code: `app = FastAPI()

@app.get("/categories/{slug}")
def read_category(
    slug: Annotated[str, Path(min_length=3, pattern="^[a-z0-9-]+$")],
):
    return {"slug": slug}`, notes: [{ at: "min_length=3", text: "at least three characters" }, { at: "pattern=", text: "regular expression check" }] },
            { code: `app = FastAPI()

@app.get("/warehouses/{code}")
def read_warehouse(code: Annotated[str, Path(title="Warehouse code")]):
    return {"code": code}`, notes: [{ at: "title=", text: "label in the docs" }] }
          ]
        },
        {
          id: "query-params", n: 3, title: "query parameters", level: 1,
          gloss: "Treats function parameters outside the path as query string values.",
          examples: [
            { code: `app = FastAPI()

@app.get("/items")
def list_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}`, notes: [{ at: "skip: int = 0", text: "optional with a default" }] },
            { code: `users = ["ada", "grace", "linus"]
app = FastAPI()

@app.get("/users")
def search_users(q: str | None = None):
    if q:
        return [name for name in users if q in name]
    return users`, notes: [{ at: "str | None", text: "optional parameter" }] },
            { code: `app = FastAPI()

@app.get("/orders")
def list_orders(shipped: bool = False):
    return {"shipped": shipped}`, notes: [{ at: "bool", text: "accepts true, 1, on, yes" }] },
            { code: `app = FastAPI()

@app.get("/prices")
def read_prices(currency: str, amount: float = 1.0):
    return {"currency": currency, "amount": amount}`, notes: [{ at: "currency: str", text: "required, no default" }] }
          ]
        },
        {
          id: "query-validation", n: 4, title: "query validation", level: 2,
          gloss: "Validates query values with Query and gathers repeated keys into lists.",
          examples: [
            { code: `app = FastAPI()

@app.get("/items")
def search_items(
    q: Annotated[str | None, Query(min_length=2, max_length=50)] = None,
):
    return {"q": q}`, notes: [{ at: "Query(", text: "adds constraints" }, { at: "min_length=2", text: "shorter values are rejected" }] },
            { code: `app = FastAPI()

@app.get("/items")
def filter_items(tags: Annotated[list[str] | None, Query()] = None):
    return {"tags": tags}`, notes: [{ at: "list[str]", text: "repeated ?tags= keys" }] },
            { code: `app = FastAPI()

@app.get("/orders")
def list_orders(limit: Annotated[int, Query(ge=1, le=100)] = 20):
    return {"limit": limit}`, notes: [{ at: "ge=1", text: "lower bound" }, { at: "le=100", text: "upper bound" }] },
            { code: `app = FastAPI()

@app.get("/search")
def search(term: Annotated[str, Query(alias="search-term")] = ""):
    return {"term": term}`, notes: [{ at: "alias=", text: "name used in the url" }] }
          ]
        }
      ]
    },
    {
      id: "request-bodies-pydantic",
      n: 3,
      title: "request bodies & Pydantic",
      concepts: [
        {
          id: "body-model", n: 1, title: "body models", level: 1,
          gloss: "Reads a JSON request body into a Pydantic model declared as a parameter.",
          examples: [
            { code: `class Item(BaseModel):
    name: str
    price: float

app = FastAPI()
@app.post("/items")
def create_item(item: Item):
    return item`, notes: [{ at: "BaseModel", text: "imports: fastapi and pydantic" }, { at: "item: Item", text: "body parsed and validated" }] },
            { code: `class User(BaseModel):
    email: str
    full_name: str | None = None
    is_active: bool = True

app = FastAPI()
@app.post("/users")
def create_user(user: User):
    return {"email": user.email, "active": user.is_active}`, notes: [{ at: "= None", text: "field is optional" }, { at: "= True", text: "default value" }] },
            { code: `class OrderLine(BaseModel):
    sku: str
    quantity: int

class Order(BaseModel):
    customer: str
    lines: list[OrderLine]
app = FastAPI()
@app.post("/orders")
def create_order(order: Order):
    return {"lines": len(order.lines)}`, notes: [{ at: "list[OrderLine]", text: "nested models" }] },
            { code: `class ItemUpdate(BaseModel):
    price: float

app = FastAPI()
@app.put("/items/{item_id}")
def update_item(item_id: int, item: ItemUpdate, notify: bool = False):
    return {"item_id": item_id, "price": item.price, "notify": notify}`, notes: [{ at: "item_id: int", text: "from the path" }, { at: "item: ItemUpdate", text: "from the body" }, { at: "notify: bool", text: "from the query string" }] }
          ]
        },
        {
          id: "field-validation", n: 2, title: "field validation", level: 2,
          gloss: "Constrains model fields with Field arguments and validator functions.",
          examples: [
            { code: `class Product(BaseModel):
    name: str = Field(min_length=2, max_length=60)
    price: float = Field(gt=0, le=100000)
    stock: int = Field(default=0, ge=0)`, notes: [{ at: "Field(", text: "per field constraints" }, { at: "default=0", text: "value when omitted" }] },
            { code: `class Account(BaseModel):
    username: Annotated[str, Field(pattern="^[a-z][a-z0-9_]{2,15}$")]
    age: Annotated[int, Field(ge=18)]`, notes: [{ at: "Annotated", text: "constraint beside the type" }] },
            { code: `class Signup(BaseModel):
    email: str

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        if "@" not in value:
            raise ValueError("email must contain @")
        return value.lower()`, notes: [{ at: "@field_validator", text: "runs after type checks" }, { at: "raise ValueError", text: "becomes a 422 error" }] }
          ]
        },
        {
          id: "model-config", n: 3, title: "model configuration", level: 2,
          gloss: "Sets model-wide options through model_config and ConfigDict.",
          examples: [
            { code: `class Item(BaseModel):
    model_config = ConfigDict(extra="forbid")
    name: str
    price: float`, notes: [{ at: "extra=\"forbid\"", text: "unknown keys are rejected" }] },
            { code: `class Customer(BaseModel):
    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_to_lower=True,
    )
    email: str`, notes: [{ at: "str_strip_whitespace", text: "trims every string" }, { at: "str_to_lower", text: "lowercases every string" }] },
            { code: `class UserRow:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
user = UserOut.model_validate(UserRow(1, "Ada"))`, notes: [{ at: "from_attributes=True", text: "reads plain objects" }, { at: "model_validate", text: "builds the model" }] },
            { code: `class Item(BaseModel):
    name: str
    price: float
    model_config = ConfigDict(
        json_schema_extra={"examples": [{"name": "Pen", "price": 2}]},
    )`, notes: [{ at: "json_schema_extra", text: "example shown in the docs" }] }
          ]
        },
        {
          id: "body-extras", n: 4, title: "body extras", level: 2,
          gloss: "Mixes several body models or single values using Body parameters.",
          examples: [
            { code: `class Item(BaseModel):
    name: str

class Buyer(BaseModel):
    email: str
app = FastAPI()
@app.post("/purchases")
def create_purchase(item: Item, buyer: Buyer):
    return {"item": item.name, "buyer": buyer.email}`, notes: [{ at: "item: Item, buyer: Buyer", text: "body keys are item and buyer" }] },
            { code: `class Item(BaseModel):
    name: str
    price: float

app = FastAPI()
@app.post("/items")
def create_item(item: Annotated[Item, Body(embed=True)]):
    return item`, notes: [{ at: "embed=True", text: "expects {\"item\": {...}}" }] },
            { code: `app = FastAPI()

@app.put("/items/{item_id}/quantity")
def set_quantity(item_id: int, quantity: Annotated[int, Body(ge=0)]):
    return {"item_id": item_id, "quantity": quantity}`, notes: [{ at: "Body(", text: "single value read from the body" }] },
            { code: `class Item(BaseModel):
    name: str

app = FastAPI()
@app.post("/items/bulk")
def create_items(items: list[Item]):
    return {"count": len(items)}`, notes: [{ at: "list[Item]", text: "body is a json array" }] }
          ]
        }
      ]
    },
    {
      id: "response-models",
      n: 4,
      title: "response models",
      concepts: [
        {
          id: "response-model", n: 1, title: "response_model", level: 1,
          gloss: "Filters and validates returned data with the response_model argument.",
          examples: [
            { code: `class UserIn(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    email: str
app = FastAPI()
@app.post("/users", response_model=UserOut)
def create_user(user: UserIn):
    return user`, notes: [{ at: "BaseModel", text: "imports: fastapi and pydantic" }, { at: "response_model=UserOut", text: "output schema" }, { at: "return user", text: "password is filtered out" }] },
            { code: `class Item(BaseModel):
    name: str
    price: float

app = FastAPI()
@app.get("/items/{item_id}")
def read_item(item_id: int) -> Item:
    return Item(name="Pen", price=1.5)`, notes: [{ at: "-> Item", text: "return type acts as the model" }] },
            { code: `class Order(BaseModel):
    id: int
    total: float

app = FastAPI()
@app.get("/orders", response_model=list[Order])
def list_orders():
    return [{"id": 1, "total": 40.0}, {"id": 2, "total": 15.5}]`, notes: [{ at: "list[Order]", text: "each item is validated" }] },
            { code: `app = FastAPI()

@app.get("/prices", response_model=dict[str, float])
def read_prices():
    return {"pen": 1.5, "notebook": 4.25}`, notes: [{ at: "dict[str, float]", text: "typed mapping" }] }
          ]
        },
        {
          id: "response-options", n: 2, title: "response options", level: 2,
          gloss: "Trims output with response_model_exclude_unset and related arguments.",
          examples: [
            { code: `class Item(BaseModel):
    name: str
    price: float = 0

app = FastAPI()
@app.get(
    "/items/{item_id}",
    response_model=Item,
    response_model_exclude_unset=True,
)
def read_item(item_id: int):
    return {"name": "Pen"}`, notes: [{ at: "exclude_unset", text: "omits fields never set" }] },
            { code: `class User(BaseModel):
    id: int
    nickname: str | None = None

app = FastAPI()
@app.get(
    "/users/{user_id}",
    response_model=User,
    response_model_exclude_none=True,
)
def read_user(user_id: int):
    return {"id": user_id, "nickname": None}`, notes: [{ at: "exclude_none", text: "drops null values" }] },
            { code: `class Account(BaseModel):
    email: str
    password: str

app = FastAPI()
@app.get(
    "/accounts/1",
    response_model=Account,
    response_model_exclude={"password"},
)
def read_account():
    return {"email": "ada@example.com", "password": "pw"}`, notes: [{ at: "response_model_exclude", text: "removes named fields" }] },
            { code: `app = FastAPI()

@app.get("/export", response_model=None)
def export_data() -> JSONResponse | dict:
    return JSONResponse({"rows": 3})`, notes: [{ at: "response_model=None", text: "turns validation off" }] }
          ]
        },
        {
          id: "response-classes", n: 3, title: "response classes", level: 2,
          gloss: "Returns HTML, plain text, redirects or custom headers with response classes.",
          examples: [
            { code: `app = FastAPI()

@app.get("/welcome", response_class=HTMLResponse)
def welcome():
    return "<h1>Welcome back</h1>"`, notes: [{ at: "response_class", text: "sets the media type" }, { at: "HTMLResponse", text: "usual fastapi.responses assumed" }] },
            { code: `app = FastAPI()

@app.get("/robots.txt", response_class=PlainTextResponse)
def robots():
    return "User-agent: *\\nDisallow: /admin"`, notes: [{ at: "PlainTextResponse", text: "text/plain body" }] },
            { code: `app = FastAPI()

@app.get("/old-orders")
def old_orders():
    return RedirectResponse(url="/orders", status_code=301)`, notes: [{ at: "RedirectResponse", text: "sends a location header" }] },
            { code: `app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return JSONResponse(
        content={"item_id": item_id},
        headers={"X-Cache": "miss"},
    )`, notes: [{ at: "JSONResponse", text: "skips response_model" }, { at: "headers=", text: "custom response headers" }] }
          ]
        }
      ]
    },
    {
      id: "status-codes-errors",
      n: 5,
      title: "status codes & errors",
      concepts: [
        {
          id: "status-codes", n: 1, title: "status codes", level: 1,
          gloss: "Sets the success status code with the status_code decorator argument.",
          examples: [
            { code: `app = FastAPI()

@app.post("/orders", status_code=status.HTTP_201_CREATED)
def create_order():
    return {"id": 501}`, notes: [{ at: "FastAPI()", text: "usual fastapi imports assumed" }, { at: "HTTP_201_CREATED", text: "named constant for 201" }] },
            { code: `app = FastAPI()

@app.delete("/tags/{tag}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tag(tag: str):
    return None`, notes: [{ at: "204", text: "response has no body" }] },
            { code: `app = FastAPI()

@app.post("/exports", status_code=status.HTTP_202_ACCEPTED)
def start_export():
    return {"job_id": "exp-77"}`, notes: [{ at: "HTTP_202_ACCEPTED", text: "work continues later" }] },
            { code: `app = FastAPI()

@app.put("/items/{item_id}")
def upsert_item(item_id: int, response: Response):
    if item_id > 100:
        response.status_code = status.HTTP_201_CREATED
    return {"item_id": item_id}`, notes: [{ at: "response: Response", text: "set the code at runtime" }] }
          ]
        },
        {
          id: "http-exception", n: 2, title: "HTTPException", level: 1,
          gloss: "Aborts a request with an HTTPException that carries a status code and detail.",
          examples: [
            { code: `items = {1: "pen", 2: "notebook"}
app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int):
    if item_id not in items:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )
    return {"name": items[item_id]}`, notes: [{ at: "raise", text: "stops the route at once" }, { at: "detail=", text: "sent in the json body" }] },
            { code: `app = FastAPI()

@app.get("/reports")
def read_reports(token: str | None = None):
    if token != "secret":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"reports": []}`, notes: [{ at: "headers=", text: "extra response headers" }] },
            { code: `emails = {"ada@example.com"}
app = FastAPI()

@app.post("/users")
def register(email: str):
    if email in emails:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )
    emails.add(email)
    return {"email": email}`, notes: [{ at: "HTTP_409_CONFLICT", text: "duplicate resource" }] },
            { code: `app = FastAPI()

@app.delete("/users/{user_id}")
def delete_user(user_id: int, is_admin: bool = False):
    if not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"code": "admin_only", "user_id": user_id},
        )
    return {"deleted": user_id}`, notes: [{ at: "detail={", text: "any json value works" }] }
          ]
        },
        {
          id: "custom-handlers", n: 3, title: "custom handlers", level: 3,
          gloss: "Maps custom exceptions to JSON responses with exception_handler.",
          examples: [
            { code: `class OutOfStock(Exception):
    def __init__(self, sku: str):
        self.sku = sku

app = FastAPI()
@app.exception_handler(OutOfStock)
async def out_of_stock_handler(request: Request, exc: OutOfStock):
    return JSONResponse(status_code=409, content={"sku": exc.sku})
@app.get("/stock/{sku}")
def read_stock(sku: str):
    raise OutOfStock(sku)`, notes: [{ at: "exception_handler", text: "maps a type to a response" }, { at: "raise OutOfStock", text: "reaches the handler" }] },
            { code: `app = FastAPI()

@app.exception_handler(RequestValidationError)
async def on_invalid(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422, content={"errors": len(exc.errors())}
    )
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}`, notes: [{ at: "RequestValidationError", text: "replaces the default 422 body" }, { at: "exc.errors()", text: "list of failures" }] },
            { code: `from starlette.exceptions import HTTPException as StarletteHTTPException

app = FastAPI()
@app.exception_handler(StarletteHTTPException)
async def http_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail},
    )`, notes: [{ at: "StarletteHTTPException", text: "covers routing 404 errors too" }] }
          ]
        }
      ]
    },
    {
      id: "dependencies",
      n: 6,
      title: "dependencies",
      concepts: [
        {
          id: "depends-basics", n: 1, title: "Depends basics", level: 1,
          gloss: "Injects shared logic into routes with Annotated and Depends.",
          examples: [
            { code: `def pagination(skip: int = 0, limit: int = 20):
    return {"skip": skip, "limit": limit}

app = FastAPI()
@app.get("/items")
def list_items(page: Annotated[dict, Depends(pagination)]):
    return page`, notes: [{ at: "FastAPI()", text: "usual fastapi imports assumed" }, { at: "Depends(pagination)", text: "called for each request" }] },
            { code: `class Pagination:
    def __init__(self, skip: int = 0, limit: int = 20):
        self.skip = skip
        self.limit = limit

app = FastAPI()
@app.get("/users")
def list_users(page: Annotated[Pagination, Depends()]):
    return {"skip": page.skip, "limit": page.limit}`, notes: [{ at: "Depends()", text: "class doubles as the dependency" }] },
            { code: `def current_locale(accept_language: Annotated[str, Header()] = "en"):
    return accept_language[:2]

Locale = Annotated[str, Depends(current_locale)]
app = FastAPI()
@app.get("/greeting")
def greeting(locale: Locale):
    return {"locale": locale}`, notes: [{ at: "Locale =", text: "reusable type alias" }, { at: "Header()", text: "reads a request header" }] },
            { code: `items = {1: "pen", 2: "notebook"}

def get_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]
app = FastAPI()
@app.get("/items/{item_id}")
def read_item(item: Annotated[str, Depends(get_item)]):
    return {"name": item}`, notes: [{ at: "item_id: int", text: "dependency reads the path too" }] }
          ]
        },
        {
          id: "dependencies-yield", n: 2, title: "yield dependencies", level: 2,
          gloss: "Runs setup and teardown around a request with a yield dependency.",
          examples: [
            { code: `def get_db():
    db = {"users": []}
    try:
        yield db
    finally:
        db.clear()

app = FastAPI()
@app.get("/users")
def list_users(db: Annotated[dict, Depends(get_db)]):
    return db["users"]`, notes: [{ at: "yield db", text: "value handed to the route" }, { at: "finally:", text: "cleanup after the response" }] },
            { code: `events = []
def audit_scope():
    events.append("open")
    yield
    events.append("close")

app = FastAPI()
@app.get("/audit", dependencies=[Depends(audit_scope)])
def read_audit():
    return {"events": list(events)}`, notes: [{ at: "yield", text: "no value, only a scope" }, { at: "dependencies=[", text: "runs without injecting" }] },
            { code: `class Connection:
    def close(self):
        print("connection closed")

def get_connection():
    conn = Connection()
    try:
        yield conn
    finally:
        conn.close()`, notes: [{ at: "conn.close()", text: "always runs, even on errors" }] }
          ]
        },
        {
          id: "route-guards", n: 3, title: "route guards", level: 2,
          gloss: "Guards routes with dependencies listed in the decorator or on the app.",
          examples: [
            { code: `def verify_token(x_token: Annotated[str, Header()]):
    if x_token != "secret-token":
        raise HTTPException(status_code=401, detail="Invalid token")

app = FastAPI()
@app.get("/reports", dependencies=[Depends(verify_token)])
def read_reports():
    return {"reports": []}`, notes: [{ at: "x_token", text: "maps to the x-token header" }, { at: "dependencies=[", text: "guard without a parameter" }] },
            { code: `def verify_key(x_api_key: Annotated[str, Header()]):
    if x_api_key != "k-123":
        raise HTTPException(status_code=401, detail="Invalid key")

app = FastAPI(dependencies=[Depends(verify_key)])
@app.get("/status")
def read_status():
    return {"up": True}`, notes: [{ at: "FastAPI(dependencies=", text: "guards every route" }] },
            { code: `def get_token(authorization: Annotated[str, Header()]):
    return authorization.removeprefix("Bearer ")

def get_current_user(token: Annotated[str, Depends(get_token)]):
    return {"name": token}
app = FastAPI()
@app.get("/me")
def read_me(user: Annotated[dict, Depends(get_current_user)]):
    return user`, notes: [{ at: "Depends(get_token)", text: "sub-dependency chain" }] }
          ]
        }
      ]
    },
    {
      id: "async-endpoints",
      n: 7,
      title: "async endpoints",
      concepts: [
        {
          id: "async-def", n: 1, title: "async def routes", level: 1,
          gloss: "Declares an async route so the event loop can await I/O without blocking.",
          examples: [
            { code: `import asyncio
app = FastAPI()

@app.get("/slow")
async def slow():
    await asyncio.sleep(0.1)
    return {"done": True}`, notes: [{ at: "FastAPI()", text: "usual fastapi imports assumed" }, { at: "await", text: "frees the loop meanwhile" }] },
            { code: `import time
app = FastAPI()

@app.get("/report")
def build_report():
    time.sleep(0.1)
    return {"rows": 120}`, notes: [{ at: "def", text: "runs in a threadpool" }, { at: "time.sleep", text: "blocking is safe here" }] },
            { code: `import asyncio
async def load_price(sku: str) -> float:
    await asyncio.sleep(0.01)
    return 4.5

app = FastAPI()
@app.get("/prices/{sku}")
async def read_price(sku: str):
    return {"sku": sku, "price": await load_price(sku)}`, notes: [{ at: "await load_price", text: "awaits another coroutine" }] },
            { code: `import asyncio
lock = asyncio.Lock()
counter = {"hits": 0}
app = FastAPI()

@app.post("/hits")
async def record_hit():
    async with lock:
        counter["hits"] += 1
    return counter`, notes: [{ at: "async with", text: "one task at a time" }] }
          ]
        },
        {
          id: "async-dependencies", n: 2, title: "async dependencies", level: 2,
          gloss: "Mixes async and plain dependencies, including async generators.",
          examples: [
            { code: `import asyncio
async def get_settings():
    await asyncio.sleep(0)
    return {"currency": "EUR"}

app = FastAPI()
@app.get("/settings")
async def read_settings(s: Annotated[dict, Depends(get_settings)]):
    return s`, notes: [{ at: "async def get_settings", text: "awaited by fastapi" }] },
            { code: `async def get_client():
    client = {"open": True}
    try:
        yield client
    finally:
        client["open"] = False

app = FastAPI()
@app.get("/client")
async def read_client(client: Annotated[dict, Depends(get_client)]):
    return client`, notes: [{ at: "yield client", text: "async generator dependency" }, { at: "finally:", text: "teardown after the response" }] },
            { code: `def get_limit():
    return 25

app = FastAPI()
@app.get("/orders")
async def list_orders(limit: Annotated[int, Depends(get_limit)]):
    return {"limit": limit}`, notes: [{ at: "def get_limit", text: "plain dependency in a thread" }] }
          ]
        },
        {
          id: "gather-timeouts", n: 3, title: "gather and timeouts", level: 2,
          gloss: "Coordinates awaits with asyncio.gather and asyncio.wait_for.",
          examples: [
            { code: `import asyncio
async def fetch_price(sku: str):
    return {"sku": sku, "price": 2.5}

app = FastAPI()
@app.get("/prices")
async def read_prices(skus: Annotated[list[str], Query()]):
    prices = await asyncio.gather(*(fetch_price(s) for s in skus))
    return list(prices)`, notes: [{ at: "asyncio.gather", text: "awaits all at once" }] },
            { code: `import asyncio
async def stock(sku: str):
    return 12

async def price(sku: str):
    return 2.5
app = FastAPI()
@app.get("/offers/{sku}")
async def read_offer(sku: str):
    in_stock, cost = await asyncio.gather(stock(sku), price(sku))
    return {"sku": sku, "stock": in_stock, "price": cost}`, notes: [{ at: "in_stock, cost", text: "results keep call order" }] },
            { code: `import asyncio
async def slow_lookup():
    await asyncio.sleep(5)

app = FastAPI()
@app.get("/lookup")
async def lookup():
    try:
        await asyncio.wait_for(slow_lookup(), timeout=0.05)
    except TimeoutError:
        raise HTTPException(status_code=504, detail="Lookup timed out")
    return {"ok": True}`, notes: [{ at: "wait_for", text: "cancels after the timeout" }, { at: "504", text: "gateway timeout" }] }
          ]
        },
        {
          id: "blocking-calls", n: 4, title: "blocking calls", level: 2,
          gloss: "Moves blocking calls off the event loop with run_in_threadpool or to_thread.",
          examples: [
            { code: `import time
from fastapi.concurrency import run_in_threadpool
def read_big_file():
    time.sleep(0.1)
    return "rows"

app = FastAPI()
@app.get("/export")
async def export():
    return {"data": await run_in_threadpool(read_big_file)}`, notes: [{ at: "run_in_threadpool", text: "runs in a worker thread" }] },
            { code: `import asyncio
import time
def compress(text: str) -> int:
    time.sleep(0.1)
    return len(text)

app = FastAPI()
@app.post("/compress")
async def compress_text(text: str):
    size = await asyncio.to_thread(compress, text)
    return {"size": size}`, notes: [{ at: "asyncio.to_thread", text: "standard library alternative" }] },
            { code: `from fastapi.concurrency import run_in_threadpool
def resize(name: str, width: int) -> str:
    return f"{name}@{width}"

app = FastAPI()
@app.get("/thumbnails/{name}")
async def thumbnail(name: str, width: int = 64):
    return {"file": await run_in_threadpool(resize, name, width)}`, notes: [{ at: "resize, name, width", text: "function then its arguments" }] }
          ]
        }
      ]
    },
    {
      id: "background-tasks",
      n: 8,
      title: "background tasks",
      concepts: [
        {
          id: "background-tasks-basics", n: 1, title: "BackgroundTasks basics", level: 1,
          gloss: "Runs a function after the response is sent using a BackgroundTasks parameter.",
          examples: [
            { code: `sent = []
def send_welcome(email: str):
    sent.append(email)

app = FastAPI()
@app.post("/signup")
def signup(email: str, tasks: BackgroundTasks):
    tasks.add_task(send_welcome, email)
    return {"message": "Welcome email queued"}`, notes: [{ at: "FastAPI()", text: "usual fastapi imports assumed" }, { at: "tasks: BackgroundTasks", text: "injected by fastapi" }, { at: "add_task", text: "runs after the response" }] },
            { code: `def write_log(message: str):
    with open("audit.log", "a") as handle:
        handle.write(message + "\\n")

app = FastAPI()
@app.post("/orders")
def create_order(tasks: BackgroundTasks):
    tasks.add_task(write_log, "order created")
    return {"id": 701}`, notes: [{ at: "write_log", text: "plain def task" }] },
            { code: `import asyncio
async def notify_warehouse(order_id: int):
    await asyncio.sleep(0.1)

app = FastAPI()
@app.post("/orders/{order_id}/ship")
async def ship_order(order_id: int, tasks: BackgroundTasks):
    tasks.add_task(notify_warehouse, order_id)
    return {"order_id": order_id, "status": "shipping"}`, notes: [{ at: "async def", text: "tasks may be coroutines" }] }
          ]
        },
        {
          id: "task-arguments", n: 2, title: "task arguments", level: 2,
          gloss: "Passes positional and keyword arguments through add_task to the function.",
          examples: [
            { code: `outbox = []
def send_email(to: str, subject: str, body: str = ""):
    outbox.append((to, subject, body))

app = FastAPI()
@app.post("/invoices/{invoice_id}/send")
def send_invoice(invoice_id: int, tasks: BackgroundTasks):
    tasks.add_task(send_email, "ada@example.com", "Invoice", body="PDF")
    return {"invoice_id": invoice_id}`, notes: [{ at: "\"Invoice\"", text: "positional argument" }, { at: "body=\"PDF\"", text: "keyword argument" }] },
            { code: `audit = []
def record(event: str):
    audit.append(event)

app = FastAPI()
@app.delete("/users/{user_id}")
def delete_user(user_id: int, tasks: BackgroundTasks):
    tasks.add_task(record, f"deleted {user_id}")
    tasks.add_task(record, "cache cleared")
    return {"deleted": user_id}`, notes: [{ at: "tasks.add_task(record, \"cache cleared\")", text: "runs after the first" }] },
            { code: `class Order(BaseModel):
    id: int
    total: float

receipts = []
def email_receipt(order: Order):
    receipts.append(order.id)
app = FastAPI()
@app.post("/orders")
def create_order(order: Order, tasks: BackgroundTasks):
    tasks.add_task(email_receipt, order)
    return order`, notes: [{ at: "email_receipt, order", text: "model passed as argument" }] }
          ]
        },
        {
          id: "tasks-in-dependencies", n: 3, title: "tasks in dependencies", level: 2,
          gloss: "Shares one BackgroundTasks instance between a route and its dependencies.",
          examples: [
            { code: `log = []

def write_log(message: str):
    log.append(message)
def log_query(tasks: BackgroundTasks, q: str = ""):
    tasks.add_task(write_log, f"query={q}")
    return q
app = FastAPI()
@app.get("/search")
def search(q: Annotated[str, Depends(log_query)]):
    return {"q": q}`, notes: [{ at: "tasks: BackgroundTasks", text: "same object as the route's" }] },
            { code: `log = []

def write_log(message: str):
    log.append(message)
def track(tasks: BackgroundTasks):
    tasks.add_task(write_log, "tracked")
app = FastAPI()
@app.post("/clicks", dependencies=[Depends(track)])
def record_click(tasks: BackgroundTasks):
    tasks.add_task(write_log, "click saved")
    return {"ok": True}`, notes: [{ at: "\"tracked\"", text: "queued first" }, { at: "\"click saved\"", text: "queued second" }] },
            { code: `log = []
def write_log(message: str):
    log.append(message)
def current_user(
    tasks: BackgroundTasks, x_user: Annotated[str, Header()]
):
    tasks.add_task(write_log, f"seen {x_user}")
    return x_user
app = FastAPI()
@app.get("/me")
def read_me(user: Annotated[str, Depends(current_user)]):
    return {"user": user}`, notes: [{ at: "f\"seen {x_user}\"", text: "audit entry per request" }] }
          ]
        }
      ]
    },
    {
      id: "middleware-cors",
      n: 9,
      title: "middleware & CORS",
      concepts: [
        {
          id: "http-middleware", n: 1, title: "http middleware", level: 1,
          gloss: "Wraps every request in a function registered with the http middleware decorator.",
          examples: [
            { code: `import time
app = FastAPI()

@app.middleware("http")
async def add_process_time(request: Request, call_next):
    started = time.perf_counter()
    response = await call_next(request)
    elapsed = time.perf_counter() - started
    response.headers["X-Process-Time"] = str(elapsed)
    return response`, notes: [{ at: "FastAPI()", text: "usual fastapi imports assumed" }, { at: "call_next", text: "passes on to the route" }, { at: "response.headers", text: "add headers after the route" }] },
            { code: `import uuid
app = FastAPI()

@app.middleware("http")
async def add_request_id(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Request-ID"] = uuid.uuid4().hex
    return response`, notes: [{ at: "uuid4().hex", text: "fresh id per request" }] },
            { code: `app = FastAPI()

@app.middleware("http")
async def require_api_key(request: Request, call_next):
    if request.headers.get("x-api-key") != "k-123":
        return JSONResponse({"detail": "Missing key"}, status_code=401)
    return await call_next(request)`, notes: [{ at: "return JSONResponse", text: "stops before the route" }, { at: "request.headers", text: "lowercase lookup works" }] }
          ]
        },
        {
          id: "cors", n: 2, title: "CORS", level: 1,
          gloss: "Allows browser origins with CORSMiddleware and its allow_ arguments.",
          examples: [
            { code: `app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shop.example.com"],
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization"],
)`, notes: [{ at: "allow_origins", text: "exact origins permitted" }, { at: "allow_methods", text: "methods for preflight" }] },
            { code: `app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`, notes: [{ at: "allow_credentials", text: "cookies allowed cross-origin" }, { at: "\"*\"", text: "every method or header" }] },
            { code: `app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\\.example\\.com",
    allow_methods=["GET"],
)`, notes: [{ at: "allow_origin_regex", text: "matches many subdomains" }] },
            { code: `app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://admin.example.com"],
    expose_headers=["X-Total-Count"],
    max_age=600,
)`, notes: [{ at: "expose_headers", text: "readable by browser scripts" }, { at: "max_age=600", text: "preflight cached ten minutes" }] }
          ]
        },
        {
          id: "builtin-middleware", n: 3, title: "built-in middleware", level: 2,
          gloss: "Adds compression, host checks and HTTPS redirects with built-in middleware.",
          examples: [
            { code: `from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=500)
@app.get("/export")
def export():
    return {"rows": ["order"] * 200}`, notes: [{ at: "minimum_size=500", text: "small bodies stay plain" }] },
            { code: `from fastapi.middleware.trustedhost import TrustedHostMiddleware

app = FastAPI()
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["example.com", "*.example.com"],
)`, notes: [{ at: "allowed_hosts", text: "other host headers get 400" }] },
            { code: `from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

app = FastAPI()
app.add_middleware(HTTPSRedirectMiddleware)`, notes: [{ at: "HTTPSRedirectMiddleware", text: "http requests are redirected" }] }
          ]
        }
      ]
    },
    {
      id: "routers",
      n: 10,
      title: "routers",
      concepts: [
        {
          id: "api-router", n: 1, title: "APIRouter", level: 1,
          gloss: "Groups related routes in an APIRouter that the app includes later.",
          examples: [
            { code: `router = APIRouter()
@router.get("/users")
def list_users():
    return ["ada", "grace"]

app = FastAPI()
app.include_router(router)`, notes: [{ at: "APIRouter()", text: "usual fastapi imports assumed" }, { at: "include_router", text: "mounts the routes" }] },
            { code: `router = APIRouter()

@router.get("/orders")
def list_orders():
    return []
@router.post("/orders")
def create_order():
    return {"id": 1}
app = FastAPI()
app.include_router(router)`, notes: [{ at: "@router.post", text: "same decorators as app" }] },
            { code: `router = APIRouter()
@router.get("/products/{product_id}")
def read_product(product_id: int):
    return {"product_id": product_id}

app = FastAPI()
app.include_router(router)`, notes: [{ at: "{product_id}", text: "path variables work as usual" }] },
            { code: `users = APIRouter()
orders = APIRouter()
@users.get("/users")
def list_users():
    return []
@orders.get("/orders")
def list_orders():
    return []

app = FastAPI()
app.include_router(users)
app.include_router(orders)`, notes: [{ at: "orders = APIRouter()", text: "one router per area" }] }
          ]
        },
        {
          id: "prefix-and-tags", n: 2, title: "prefix and tags", level: 1,
          gloss: "Sets a shared prefix and tags on an APIRouter or when including it.",
          examples: [
            { code: `router = APIRouter(prefix="/users", tags=["users"])
@router.get("")
def list_users():
    return []
@router.get("/{user_id}")
def read_user(user_id: int):
    return {"id": user_id}

app = FastAPI()
app.include_router(router)`, notes: [{ at: "prefix=\"/users\"", text: "prepended to every path" }, { at: "tags=[\"users\"]", text: "docs group" }] },
            { code: `router = APIRouter()
@router.get("/items")
def list_items():
    return []

app = FastAPI()
app.include_router(router, prefix="/api/v1", tags=["items"])`, notes: [{ at: "prefix=", text: "chosen where it is mounted" }] },
            { code: `router = APIRouter()
@router.get("/status")
def read_status():
    return {"up": True}

app = FastAPI()
app.include_router(router, prefix="/v1")
app.include_router(router, prefix="/v2")`, notes: [{ at: "prefix=\"/v2\"", text: "same router mounted twice" }] }
          ]
        },
        {
          id: "router-shared-options", n: 3, title: "shared router options", level: 2,
          gloss: "Applies shared dependencies and responses to every route of a router.",
          examples: [
            { code: `def is_admin(x_role: Annotated[str, Header()]):
    if x_role != "admin":
        raise HTTPException(status_code=403, detail="Admins only")

router = APIRouter(prefix="/admin", dependencies=[Depends(is_admin)])
@router.get("/stats")
def read_stats():
    return {"users": 42}
app = FastAPI()
app.include_router(router)`, notes: [{ at: "dependencies=[", text: "guards the whole router" }] },
            { code: `def verify_key(x_key: Annotated[str, Header()]):
    if x_key != "k-123":
        raise HTTPException(status_code=401, detail="Invalid key")

router = APIRouter()
@router.get("/invoices")
def list_invoices():
    return []
app = FastAPI()
app.include_router(router, dependencies=[Depends(verify_key)])`, notes: [{ at: "include_router(", text: "guard added when mounting" }] },
            { code: `router = APIRouter(
    prefix="/items",
    responses={404: {"description": "Item not found"}},
)
@router.get("/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

app = FastAPI()
app.include_router(router)`, notes: [{ at: "responses=", text: "documented for every route" }] }
          ]
        },
        {
          id: "nested-routers", n: 4, title: "nested routers", level: 3,
          gloss: "Includes routers inside other routers to compose a versioned URL tree.",
          examples: [
            { code: `users = APIRouter(prefix="/users")
@users.get("")
def list_users():
    return []
admin = APIRouter(prefix="/admin")
admin.include_router(users)

app = FastAPI()
app.include_router(admin)`, notes: [{ at: "admin.include_router", text: "router inside a router" }, { at: "prefix=\"/admin\"", text: "prefix of the outer router" }] },
            { code: `orders = APIRouter(prefix="/orders")
@orders.get("/{order_id}")
def read_order(order_id: int):
    return {"order_id": order_id}
v1 = APIRouter(prefix="/v1")
v1.include_router(orders)

app = FastAPI()
app.include_router(v1, prefix="/api")`, notes: [{ at: "prefix=\"/api\"", text: "outermost segment" }] },
            { code: `users = APIRouter(prefix="/users")
items = APIRouter(prefix="/items")
@users.get("")
def list_users():
    return []
@items.get("")
def list_items():
    return []
api = APIRouter(prefix="/api")
api.include_router(users)
api.include_router(items)`, notes: [{ at: "api.include_router", text: "two children, one parent" }] }
          ]
        }
      ]
    },
    {
      id: "file-uploads",
      n: 11,
      title: "file uploads",
      concepts: [
        {
          id: "bytes-file", n: 1, title: "files as bytes", level: 1,
          gloss: "Reads a small upload into memory as bytes with the File parameter.",
          examples: [
            { code: `app = FastAPI()

@app.post("/avatars")
def upload_avatar(avatar: Annotated[bytes, File()]):
    return {"size": len(avatar)}`, notes: [{ at: "FastAPI()", text: "usual fastapi imports assumed" }, { at: "File()", text: "needs python-multipart" }, { at: "bytes", text: "whole file is held in memory" }] },
            { code: `app = FastAPI()

@app.post("/imports")
def import_prices(data: Annotated[bytes, File(description="CSV file")]):
    rows = data.decode().splitlines()
    return {"rows": len(rows)}`, notes: [{ at: "description=", text: "shown in the docs" }] },
            { code: `app = FastAPI()

@app.post("/profiles")
def update_profile(photo: Annotated[bytes | None, File()] = None):
    if photo is None:
        return {"photo": "unchanged"}
    return {"photo": len(photo)}`, notes: [{ at: "bytes | None", text: "upload is optional" }] }
          ]
        },
        {
          id: "upload-file", n: 2, title: "UploadFile", level: 1,
          gloss: "Streams large uploads with UploadFile, exposing filename and content_type.",
          examples: [
            { code: `app = FastAPI()

@app.post("/documents")
async def upload_document(file: UploadFile):
    content = await file.read()
    return {"filename": file.filename, "size": len(content)}`, notes: [{ at: "file.read()", text: "async read of the contents" }, { at: "file.filename", text: "name sent by the client" }] },
            { code: `app = FastAPI()

@app.post("/images")
async def upload_image(image: UploadFile):
    if image.content_type not in ("image/png", "image/jpeg"):
        raise HTTPException(status_code=415, detail="Unsupported type")
    return {"filename": image.filename}`, notes: [{ at: "content_type", text: "declared by the client" }, { at: "415", text: "unsupported media type" }] },
            { code: `import shutil
app = FastAPI()

@app.post("/backups")
def save_backup(upload: UploadFile):
    with open("backup.bin", "wb") as target:
        shutil.copyfileobj(upload.file, target)
    return {"saved": upload.filename}`, notes: [{ at: "upload.file", text: "the underlying file object" }, { at: "copyfileobj", text: "copies in chunks" }] }
          ]
        },
        {
          id: "multiple-files", n: 3, title: "multiple files", level: 2,
          gloss: "Accepts several uploads at once as a list of UploadFile.",
          examples: [
            { code: `app = FastAPI()

@app.post("/photos")
async def upload_photos(files: list[UploadFile]):
    return {"names": [item.filename for item in files]}`, notes: [{ at: "list[UploadFile]", text: "one part per file" }] },
            { code: `app = FastAPI()

@app.post("/batches")
def upload_batches(files: Annotated[list[bytes], File()]):
    return {"sizes": [len(content) for content in files]}`, notes: [{ at: "list[bytes]", text: "every file read into memory" }] },
            { code: `app = FastAPI()

@app.post("/attachments")
async def upload_attachments(files: list[UploadFile]):
    total = 0
    for item in files:
        total += len(await item.read())
    return {"count": len(files), "total": total}`, notes: [{ at: "await item.read()", text: "read each file in turn" }] }
          ]
        },
        {
          id: "form-fields", n: 4, title: "form fields", level: 2,
          gloss: "Reads form fields next to files with Form parameters or a Form model.",
          examples: [
            { code: `app = FastAPI()

@app.post("/login")
def login(
    username: Annotated[str, Form()],
    password: Annotated[str, Form()],
):
    return {"username": username}`, notes: [{ at: "Form()", text: "reads urlencoded form data" }] },
            { code: `app = FastAPI()

@app.post("/documents")
async def upload_document(
    file: UploadFile,
    title: Annotated[str, Form()],
):
    return {"title": title, "filename": file.filename}`, notes: [{ at: "file: UploadFile", text: "body is multipart, not json" }] },
            { code: `class LoginForm(BaseModel):
    username: str
    password: str
    remember: bool = False

app = FastAPI()
@app.post("/token")
def issue_token(form: Annotated[LoginForm, Form()]):
    return {"username": form.username, "remember": form.remember}`, notes: [{ at: "Form()", text: "whole model from form fields" }] }
          ]
        }
      ]
    },
    {
      id: "testing-with-testclient",
      n: 12,
      title: "testing with TestClient",
      concepts: [
        {
          id: "test-requests", n: 1, title: "test client requests", level: 1,
          gloss: "Calls routes in-process with TestClient and asserts on the response.",
          examples: [
            { code: `app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}
client = TestClient(app)
def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}`, notes: [{ at: "TestClient", text: "imports: fastapi and testclient" }, { at: "response.json()", text: "parsed body" }] },
            { code: `app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
client = TestClient(app)
def test_read_item():
    response = client.get("/items/7")
    assert response.json() == {"item_id": 7}`, notes: [{ at: "client.get", text: "no server needed" }] },
            { code: `app = FastAPI()

@app.get("/search")
def search(q: str, limit: int = 10):
    return {"q": q, "limit": limit}
client = TestClient(app)
def test_search():
    response = client.get("/search", params={"q": "pen", "limit": 5})
    assert response.json()["limit"] == 5`, notes: [{ at: "params=", text: "builds the query string" }] },
            { code: `app = FastAPI()

@app.get("/me")
def read_me(x_user: Annotated[str, Header()]):
    return {"user": x_user}
client = TestClient(app)
def test_read_me():
    response = client.get("/me", headers={"X-User": "ada"})
    assert response.json() == {"user": "ada"}`, notes: [{ at: "headers=", text: "sent with the request" }] }
          ]
        },
        {
          id: "test-bodies", n: 2, title: "test client bodies", level: 1,
          gloss: "Sends JSON, form data and files through the json, data and files arguments.",
          examples: [
            { code: `class Item(BaseModel):
    name: str

app = FastAPI()
@app.post("/items", status_code=201)
def create_item(item: Item):
    return item
client = TestClient(app)
def test_create_item():
    response = client.post("/items", json={"name": "Pen"})
    assert response.status_code == 201
    assert response.json() == {"name": "Pen"}`, notes: [{ at: "json=", text: "serialized for you" }] },
            { code: `app = FastAPI()

@app.post("/login")
def login(username: Annotated[str, Form()]):
    return {"user": username}
client = TestClient(app)
def test_login():
    response = client.post("/login", data={"username": "ada"})
    assert response.json() == {"user": "ada"}`, notes: [{ at: "data=", text: "sent as form fields" }] },
            { code: `app = FastAPI()

@app.post("/documents")
def upload(file: UploadFile):
    return {"filename": file.filename}
client = TestClient(app)
def test_upload():
    files = {"file": ("report.txt", b"hello", "text/plain")}
    response = client.post("/documents", files=files)
    assert response.json() == {"filename": "report.txt"}`, notes: [{ at: "files=", text: "sent as multipart" }, { at: "(\"report.txt\", b\"hello\", \"text/plain\")", text: "name, content, type" }] }
          ]
        },
        {
          id: "test-errors", n: 3, title: "testing errors", level: 2,
          gloss: "Asserts on 404 and 422 responses by inspecting status_code and detail.",
          examples: [
            { code: `app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int):
    raise HTTPException(status_code=404, detail="Item not found")
client = TestClient(app)
def test_missing_item():
    response = client.get("/items/99")
    assert response.status_code == 404
    assert response.json() == {"detail": "Item not found"}`, notes: [{ at: "detail", text: "message from the exception" }] },
            { code: `app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
client = TestClient(app)
def test_bad_id():
    response = client.get("/items/abc")
    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"] == ["path", "item_id"]`, notes: [{ at: "422", text: "validation failed" }, { at: "loc", text: "where the error occurred" }] },
            { code: `app = FastAPI()

@app.get("/crash")
def crash():
    raise RuntimeError("database offline")
client = TestClient(app, raise_server_exceptions=False)
def test_crash():
    assert client.get("/crash").status_code == 500`, notes: [{ at: "raise_server_exceptions=False", text: "returns 500, no re-raise" }] }
          ]
        },
        {
          id: "dependency-overrides", n: 4, title: "dependency overrides", level: 2,
          gloss: "Swaps a dependency for a fake inside tests with app.dependency_overrides.",
          examples: [
            { code: `def get_prices():
    return {"pen": 1.5}
app = FastAPI()
@app.get("/prices")
def read_prices(prices: Annotated[dict, Depends(get_prices)]):
    return prices
client = TestClient(app)
def test_prices():
    app.dependency_overrides[get_prices] = lambda: {"pen": 9.0}
    assert client.get("/prices").json() == {"pen": 9.0}
    app.dependency_overrides.clear()`, notes: [{ at: "dependency_overrides", text: "keyed by the original function" }, { at: "clear()", text: "restore real dependencies" }] },
            { code: `def current_user():
    raise HTTPException(status_code=401)
app = FastAPI()
@app.get("/me")
def read_me(user: Annotated[str, Depends(current_user)]):
    return {"user": user}
client = TestClient(app)
def test_me():
    app.dependency_overrides[current_user] = lambda: "ada"
    assert client.get("/me").json() == {"user": "ada"}`, notes: [{ at: "lambda: \"ada\"", text: "skips the auth check" }] },
            { code: `def get_limit(limit: int = 20):
    return limit
app = FastAPI()
@app.get("/orders")
def list_orders(limit: Annotated[int, Depends(get_limit)]):
    return {"limit": limit}
client = TestClient(app)
def test_limit_override():
    app.dependency_overrides[get_limit] = lambda: 1
    assert client.get("/orders?limit=50").json() == {"limit": 1}
    app.dependency_overrides.clear()`, notes: [{ at: "lambda: 1", text: "replaces parameters too" }] }
          ]
        }
      ]
    }
  ]
};
