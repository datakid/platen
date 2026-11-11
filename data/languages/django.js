export default {
  id: "django",
  name: "Django",
  short: "DJ",
  pigment: "django",
  family: "python",
  version: "6.1",
  lexer: "python",
  indent: 4,
  topics: [
    {
      id: "models-fields",
      n: 1,
      title: "models & fields",
      concepts: [
        {
          id: "model-class", n: 1, title: "defining a model", level: 1,
          gloss: "Defines a database table as a class that subclasses models.Model.",
          examples: [
            { code: `class Article(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)`, notes: [{ at: "models.Model", text: "assumes the usual django imports" }, { at: "auto_now_add", text: "set once on insert" }] },
            { code: `class Product(models.Model):
    name = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)`, notes: [{ at: "max_digits", text: "total digits stored" }, { at: "default=0", text: "value when none is given" }] },
            { code: `class Customer(models.Model):
    email = models.EmailField(unique=True)
    joined = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)`, notes: [{ at: "unique=True", text: "database allows one per email" }] },
            { code: `class Country(models.Model):
    code = models.CharField(max_length=2, primary_key=True)
    name = models.CharField(max_length=80)`, notes: [{ at: "primary_key=True", text: "replaces the automatic id" }] }
          ]
        },
        {
          id: "field-types", n: 2, title: "choosing field types", level: 1,
          gloss: "Maps each column to a field class such as EmailField, SlugField or JSONField.",
          examples: [
            { code: `class Profile(models.Model):
    email = models.EmailField()
    website = models.URLField(blank=True)
    handle = models.SlugField(max_length=40)`, notes: [{ at: "EmailField", text: "char field with email checks" }, { at: "SlugField", text: "letters, digits and hyphens" }] },
            { code: `class Event(models.Model):
    ref = models.UUIDField(default=uuid.uuid4, editable=False)
    payload = models.JSONField(default=dict)
    length = models.DurationField(null=True)`, notes: [{ at: "uuid.uuid4", text: "callable run for each row" }, { at: "JSONField", text: "stores dicts and lists" }] },
            { code: `class Reading(models.Model):
    sensor = models.CharField(max_length=30)
    value = models.FloatField()
    taken = models.DateTimeField()
    samples = models.BigIntegerField(default=0)`, notes: [{ at: "FloatField", text: "double precision number" }] },
            { code: `class Attachment(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to="attachments/")
    size = models.PositiveBigIntegerField(default=0)`, notes: [{ at: "upload_to", text: "folder under the media root" }] }
          ]
        },
        {
          id: "field-options", n: 3, title: "tuning fields with options", level: 2,
          gloss: "Controls nulls, defaults, uniqueness and help text through field arguments.",
          examples: [
            { code: `class Invoice(models.Model):
    number = models.CharField(max_length=20, unique=True)
    note = models.TextField(blank=True, default="")
    paid_on = models.DateField(null=True)`, notes: [{ at: "unique=True", text: "no two rows share a value" }, { at: "paid_on", text: "null allows an empty column" }] },
            { code: `class Member(models.Model):
    nickname = models.CharField(
        max_length=30,
        verbose_name="display name",
        help_text="shown on every post",
        db_index=True,
    )`, notes: [{ at: "help_text", text: "shown beside the form input" }, { at: "db_index", text: "adds a database index" }] },
            { code: `class Task(models.Model):
    title = models.CharField(max_length=80)
    priority = models.IntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )`, notes: [{ at: "validators", text: "run by full_clean and forms" }] },
            { code: `class Session(models.Model):
    started = models.DateTimeField(default=timezone.now)
    token = models.CharField(max_length=32, default=secrets.token_hex)`, notes: [{ at: "default=timezone.now", text: "pass the callable, not a call" }] }
          ]
        },
        {
          id: "choices", n: 4, title: "restricting values", level: 2,
          gloss: "Limits a field to a fixed set of values with TextChoices or IntegerChoices.",
          examples: [
            { code: `class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    status = models.CharField(
        max_length=10,
        choices=Status,
        default=Status.DRAFT,
    )`, notes: [{ at: "TextChoices", text: "members hold a value and a label" }, { at: "choices=Status", text: "accepts the enum class directly" }] },
            { code: `class Level(models.IntegerChoices):
    LOW = 1
    HIGH = 3

class Alert(models.Model):
    level = models.IntegerField(choices=Level, default=Level.LOW)`, notes: [{ at: "IntegerChoices", text: "labels come from member names" }] },
            { code: `class Shirt(models.Model):
    SIZES = [("s", "Small"), ("m", "Medium"), ("l", "Large")]
    size = models.CharField(max_length=1, choices=SIZES)`, notes: [{ at: "choices=SIZES", text: "adds get_size_display" }] }
          ]
        },
        {
          id: "meta-str", n: 5, title: "Meta and __str__", level: 2,
          gloss: "Adds default ordering, constraints and readable labels through Meta and __str__.",
          examples: [
            { code: `class Book(models.Model):
    title = models.CharField(max_length=200)
    published = models.DateField()

    class Meta:
        ordering = ["-published", "title"]
        verbose_name_plural = "books on the shelf"`, notes: [{ at: "ordering", text: "default order for queries" }, { at: "verbose_name_plural", text: "label shown in the admin" }] },
            { code: `class Member(models.Model):
    first = models.CharField(max_length=40)
    last = models.CharField(max_length=40)

    def __str__(self):
        return f"{self.first} {self.last}"`, notes: [{ at: "__str__", text: "label in the admin and shell" }] },
            { code: `class Booking(models.Model):
    room = models.CharField(max_length=20)
    day = models.DateField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["room", "day"],
                name="one_booking_per_day",
            ),
        ]`, notes: [{ at: "UniqueConstraint", text: "one booking per room and day" }] },
            { code: `class Page(models.Model):
    slug = models.SlugField(unique=True)

    def get_absolute_url(self):
        return reverse("page-detail", kwargs={"slug": self.slug})`, notes: [{ at: "reverse", text: "needs a url named page-detail" }] }
          ]
        }
      ]
    },
    {
      id: "orm-queries",
      n: 2,
      title: "ORM queries",
      concepts: [
        {
          id: "create-rows", n: 1, title: "creating rows", level: 1,
          gloss: "Creates rows with create(), save() or bulk_create().",
          examples: [
            { code: `author = Author.objects.get(name="Ursula Le Guin")
book = Book.objects.create(title="Lavinia", author=author)
print(book.pk)`, notes: [{ at: "Book.objects", text: "assumes the usual imports and models" }, { at: "create(", text: "inserts and returns the instance" }] },
            { code: `book = Book(title="Gifts", author_id=2, pages=288)
book.price = 14
book.save()`, notes: [{ at: "author_id=2", text: "sets the foreign key directly" }, { at: "save()", text: "runs the insert" }] },
            { code: `Tag.objects.bulk_create([
    Tag(name="classic"),
    Tag(name="short"),
    Tag(name="award"),
])`, notes: [{ at: "bulk_create", text: "one insert for the whole list" }] },
            { code: `genre, created = Genre.objects.get_or_create(name="Horror")
print(genre.pk, created)`, notes: [{ at: "created", text: "true when a row was inserted" }] }
          ]
        },
        {
          id: "fetch-rows", n: 2, title: "fetching rows", level: 1,
          gloss: "Retrieves rows with all(), get(), first(), count() and exists().",
          examples: [
            { code: `books = Book.objects.all()
for book in books:
    print(book.title)`, notes: [{ at: "all()", text: "lazy until the loop runs" }] },
            { code: `book = Book.objects.get(pk=1)
print(book.title, book.price)`, notes: [{ at: "get(pk=1)", text: "exactly one row or an error" }] },
            { code: `newest = Book.objects.order_by("-published").first()
total = Book.objects.count()
in_stock = Book.objects.filter(in_stock=True).exists()`, notes: [{ at: "first()", text: "one row or none" }, { at: "exists()", text: "cheaper than counting rows" }] },
            { code: `try:
    book = Book.objects.get(title="Missing")
except Book.DoesNotExist:
    book = None`, notes: [{ at: "DoesNotExist", text: "raised when nothing matches" }] }
          ]
        },
        {
          id: "value-queries", n: 3, title: "plain values", level: 2,
          gloss: "Returns dicts, tuples or partial models with values(), values_list() and only().",
          examples: [
            { code: `rows = Book.objects.values("title", "price")
print(rows[0]["title"])`, notes: [{ at: "values(", text: "yields dicts, not models" }] },
            { code: `titles = list(Book.objects.values_list("title", flat=True))
print(titles)`, notes: [{ at: "flat=True", text: "single values instead of tuples" }] },
            { code: `book = Book.objects.only("title").get(pk=1)
print(book.title)`, notes: [{ at: "only(", text: "loads other columns on demand" }] },
            { code: `by_id = Book.objects.in_bulk([1, 2, 3])
print(by_id[1].title)`, notes: [{ at: "in_bulk", text: "dict keyed by primary key" }] }
          ]
        },
        {
          id: "update-delete", n: 4, title: "updating and deleting", level: 2,
          gloss: "Changes or removes rows with update(), delete() and F expressions.",
          examples: [
            { code: `updated = Book.objects.filter(author__name="Octavia Butler").update(
    in_stock=True
)
print(updated)`, notes: [{ at: "update(", text: "one statement, returns a count" }] },
            { code: `Book.objects.update(pages=F("pages") + 10)`, notes: [{ at: "F(\"pages\")", text: "computed inside the database" }] },
            { code: `book = Book.objects.get(pk=2)
book.title = "Dune Messiah"
book.save(update_fields=["title"])`, notes: [{ at: "update_fields", text: "writes only the listed columns" }] },
            { code: `removed, per_model = Book.objects.filter(rating__isnull=True).delete()
print(removed, per_model)`, notes: [{ at: "delete()", text: "returns total and per model counts" }] }
          ]
        },
        {
          id: "order-slice", n: 5, title: "ordering and slicing", level: 2,
          gloss: "Orders and slices results with order_by(), reverse(), distinct() and slices.",
          examples: [
            { code: `books = Book.objects.order_by("-published")
print(books[0].title)`, notes: [{ at: "\"-published\"", text: "minus sign sorts descending" }] },
            { code: `books = Book.objects.order_by("author__name", "title")
for book in books:
    print(book.author.name, book.title)`, notes: [{ at: "author__name", text: "orders across a relation" }] },
            { code: `latest = Book.objects.order_by("-published")[:3]
print([book.title for book in latest])`, notes: [{ at: "[:3]", text: "becomes a limit clause" }] },
            { code: `author_ids = Book.objects.order_by().values_list("author", flat=True)
print(author_ids.distinct().count())`, notes: [{ at: "order_by()", text: "clears the default ordering" }] }
          ]
        }
      ]
    },
    {
      id: "filters-lookups",
      n: 3,
      title: "filters & lookups",
      concepts: [
        {
          id: "filter-basics", n: 1, title: "filter and exclude", level: 1,
          gloss: "Narrows a queryset with filter(), exclude() and chained calls.",
          examples: [
            { code: `scifi = Book.objects.filter(genre__name="Science Fiction")
print(scifi.count())`, notes: [{ at: "filter(", text: "assumes the usual imports and models" }, { at: "genre__name", text: "follows the foreign key" }] },
            { code: `cheap = Book.objects.filter(price__lt=10).exclude(in_stock=False)
print(cheap.count())`, notes: [{ at: "exclude(", text: "removes matching rows" }] },
            { code: `books = Book.objects.filter(author__name="Frank Herbert", pages__gt=300)
print(books.count())`, notes: [{ at: "pages__gt", text: "and joins every keyword" }] },
            { code: `books = Book.objects.filter(in_stock=True)
books = books.filter(rating__gte=4)
print(books.count())`, notes: [{ at: "books.filter", text: "each call narrows further" }] }
          ]
        },
        {
          id: "field-lookups", n: 2, title: "field lookups", level: 2,
          gloss: "Applies lookup suffixes such as icontains, in, range and isnull.",
          examples: [
            { code: `books = Book.objects.filter(title__icontains="dune")
print(books.count())`, notes: [{ at: "icontains", text: "case insensitive substring" }] },
            { code: `books = Book.objects.filter(pk__in=[1, 2, 5])
print(books.count())`, notes: [{ at: "pk__in", text: "matches any listed value" }] },
            { code: `books = Book.objects.filter(pages__range=(200, 400))
print(books.count())`, notes: [{ at: "range", text: "inclusive on both ends" }] },
            { code: `unrated = Book.objects.filter(rating__isnull=True)
starts = Book.objects.filter(title__startswith="The")
print(unrated.count(), starts.count())`, notes: [{ at: "isnull", text: "tests for a null column" }] }
          ]
        },
        {
          id: "date-lookups", n: 3, title: "date lookups", level: 2,
          gloss: "Filters dates by year, month or weekday and compares them with date objects.",
          examples: [
            { code: `books = Book.objects.filter(published__year=1974)
print(books.count())`, notes: [{ at: "published__year", text: "year part of the date" }] },
            { code: `books = Book.objects.filter(published__gte=date(1970, 1, 1))
print(books.count())`, notes: [{ at: "date(1970, 1, 1)", text: "plain date objects compare directly" }] },
            { code: `books = Book.objects.filter(published__month=8)
print(books.count())`, notes: [{ at: "published__month", text: "month number from 1 to 12" }] },
            { code: `start, end = date(1960, 1, 1), date(1979, 12, 31)
books = Book.objects.filter(published__range=(start, end))
print(books.count())`, notes: [{ at: "published__range", text: "two dates, both included" }] }
          ]
        },
        {
          id: "q-objects", n: 4, title: "Q objects", level: 3,
          gloss: "Combines conditions with Q objects joined by|, & and ~.",
          examples: [
            { code: `books = Book.objects.filter(Q(pages__lt=200) | Q(price__lt=8))
print(books.count())`, notes: [{ at: "|", text: "or between two conditions" }] },
            { code: `fantasy = Q(genre__name="Fantasy")
books = Book.objects.filter(Q(in_stock=True) & ~fantasy)
print(books.count())`, notes: [{ at: "~fantasy", text: "negates the condition" }] },
            { code: `words = ["dune", "earth"]
query = Q()
for word in words:
    query |= Q(title__icontains=word)
books = Book.objects.filter(query)`, notes: [{ at: "Q()", text: "empty condition to build on" }] },
            { code: `books = Book.objects.filter(
    Q(author__name__startswith="Frank") | Q(genre__isnull=True),
    in_stock=True,
)`, notes: [{ at: "in_stock=True", text: "keyword filters come last" }] }
          ]
        },
        {
          id: "f-expressions", n: 5, title: "F expressions", level: 3,
          gloss: "Compares and updates columns with F() instead of values loaded into Python.",
          examples: [
            { code: `books = Book.objects.filter(pages__gt=F("price") * 40)
print(books.count())`, notes: [{ at: "F(\"price\")", text: "refers to another column" }] },
            { code: `Book.objects.filter(in_stock=False).update(price=F("price") * 2)`, notes: [{ at: "F(\"price\") * 2", text: "arithmetic runs in sql" }] },
            { code: `books = Book.objects.order_by(F("rating").desc(nulls_last=True))
print(books.first().title)`, notes: [{ at: "nulls_last=True", text: "unrated books sort to the end" }] },
            { code: `reviews = Review.objects.filter(stars__gt=F("book__rating"))
print(reviews.count())`, notes: [{ at: "book__rating", text: "lookups follow relations too" }] }
          ]
        },
        {
          id: "aggregates", n: 6, title: "aggregates and annotations", level: 3,
          gloss: "Computes totals with aggregate() and adds per row values with annotate().",
          examples: [
            { code: `stats = Book.objects.aggregate(
    average=Avg("price"),
    biggest=Max("pages"),
)
print(stats["average"], stats["biggest"])`, notes: [{ at: "aggregate(", text: "returns one dict for all rows" }] },
            { code: `authors = Author.objects.annotate(total=Count("books"))
for author in authors:
    print(author.name, author.total)`, notes: [{ at: "Count(\"books\")", text: "counts through the reverse name" }] },
            { code: `genres = Genre.objects.annotate(n=Count("books")).filter(n__gt=1)
print(genres.count())`, notes: [{ at: "filter(n__gt=1)", text: "filters on the annotation" }] },
            { code: `oldest = Book.objects.aggregate(Min("published"), Max("published"))
print(oldest["published__min"], oldest["published__max"])`, notes: [{ at: "published__min", text: "default key from field and function" }] }
          ]
        }
      ]
    },
    {
      id: "relationships",
      n: 4,
      title: "relationships",
      concepts: [
        {
          id: "foreign-key", n: 1, title: "foreign keys", level: 1,
          gloss: "Links many rows to one parent with ForeignKey and an on_delete rule.",
          examples: [
            { code: `class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)`, notes: [{ at: "ForeignKey", text: "assumes the usual django imports" }, { at: "on_delete", text: "rule when the parent is removed" }] },
            { code: `class Team(models.Model):
    name = models.CharField(max_length=60)

class Player(models.Model):
    name = models.CharField(max_length=60)
    team = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name="players"
    )`, notes: [{ at: "related_name", text: "team.players replaces player_set" }] },
            { code: `class Employee(models.Model):
    name = models.CharField(max_length=80)
    manager = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.SET_NULL
    )`, notes: [{ at: "\"self\"", text: "points back at the same model" }, { at: "SET_NULL", text: "column must allow null" }] },
            { code: `class Category(models.Model):
    name = models.CharField(max_length=60)

class Item(models.Model):
    name = models.CharField(max_length=60)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)`, notes: [{ at: "PROTECT", text: "blocks deleting a used category" }] }
          ]
        },
        {
          id: "many-to-many", n: 2, title: "many to many", level: 2,
          gloss: "Connects rows on both sides with ManyToManyField and an optional through model.",
          examples: [
            { code: `class Tag(models.Model):
    name = models.CharField(max_length=40)

class Article(models.Model):
    title = models.CharField(max_length=200)
    tags = models.ManyToManyField(Tag, blank=True)`, notes: [{ at: "ManyToManyField", text: "django creates the join table" }] },
            { code: `class Course(models.Model):
    title = models.CharField(max_length=80)
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL, through="Enrollment"
    )

class Enrollment(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.CharField(max_length=2, blank=True)`, notes: [{ at: "through=", text: "custom join model with extra data" }] },
            { code: `class Person(models.Model):
    name = models.CharField(max_length=80)
    friends = models.ManyToManyField("self")`, notes: [{ at: "\"self\"", text: "symmetrical by default" }] },
            { code: `class Recipe(models.Model):
    title = models.CharField(max_length=100)
    ingredients = models.ManyToManyField(
        "Ingredient", related_name="recipes"
    )

class Ingredient(models.Model):
    name = models.CharField(max_length=60)`, notes: [{ at: "\"Ingredient\"", text: "string allows a later definition" }] }
          ]
        },
        {
          id: "one-to-one", n: 3, title: "one to one", level: 2,
          gloss: "Pairs each row with at most one row elsewhere using OneToOneField.",
          examples: [
            { code: `class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    bio = models.TextField(blank=True)`, notes: [{ at: "OneToOneField", text: "a unique foreign key" }, { at: "related_name", text: "user.profile reads the other side" }] },
            { code: `class Person(models.Model):
    name = models.CharField(max_length=80)

class Passport(models.Model):
    person = models.OneToOneField(
        Person, on_delete=models.CASCADE, primary_key=True
    )
    number = models.CharField(max_length=12)`, notes: [{ at: "primary_key=True", text: "shares the person id" }] },
            { code: `class Restaurant(models.Model):
    name = models.CharField(max_length=80)

class Menu(models.Model):
    restaurant = models.OneToOneField(
        Restaurant, on_delete=models.CASCADE
    )
    updated = models.DateField(auto_now=True)`, notes: [{ at: "auto_now", text: "refreshed on every save" }] }
          ]
        },
        {
          id: "relation-queries", n: 4, title: "querying relations", level: 2,
          gloss: "Reads across relations with reverse managers, double underscores and prefetching.",
          examples: [
            { code: `author = Author.objects.get(name="Ursula Le Guin")
for book in author.books.all():
    print(book.title)`, notes: [{ at: "author.books", text: "reverse manager from related_name" }] },
            { code: `books = Book.objects.select_related("author")
for book in books:
    print(book.title, book.author.name)`, notes: [{ at: "select_related", text: "joins in a single query" }] },
            { code: `authors = Author.objects.prefetch_related("books")
for author in authors:
    print(author.name, len(author.books.all()))`, notes: [{ at: "prefetch_related", text: "second query, joined in python" }] },
            { code: `book = Book.objects.get(pk=1)
epic = Tag.objects.create(name="epic")
book.tags.add(epic)
print(book.tags.count())`, notes: [{ at: "tags.add", text: "inserts a row in the join table" }] }
          ]
        }
      ]
    },
    {
      id: "migrations-manage",
      n: 5,
      title: "migrations & manage.py",
      concepts: [
        {
          id: "migration-files", n: 1, title: "migration files", level: 1,
          gloss: "Describes schema changes in a Migration class with dependencies and operations.",
          examples: [
            { code: `class Migration(migrations.Migration):
    dependencies = [("library", "0001_initial")]
    operations = [
        migrations.AddField(
            model_name="book",
            name="subtitle",
            field=models.CharField(max_length=200, blank=True),
        ),
    ]`, notes: [{ at: "migrations.Migration", text: "assumes the usual django imports" }, { at: "dependencies", text: "runs after the listed migration" }] },
            { code: `class Migration(migrations.Migration):
    operations = [
        migrations.CreateModel(
            name="Publisher",
            fields=[
                ("id", models.BigAutoField(primary_key=True)),
                ("name", models.CharField(max_length=100)),
            ],
        ),
    ]`, notes: [{ at: "CreateModel", text: "builds a new table" }] },
            { code: `class Migration(migrations.Migration):
    operations = [
        migrations.AddField(
            model_name="author",
            name="died",
            field=models.IntegerField(null=True),
        ),
    ]`, notes: [{ at: "model_name", text: "lowercase name of the model" }] }
          ]
        },
        {
          id: "schema-operations", n: 2, title: "schema operations", level: 2,
          gloss: "Alters tables with RenameField, AlterField, AddIndex and DeleteModel.",
          examples: [
            { code: `class Migration(migrations.Migration):
    operations = [
        migrations.RenameField("book", "pages", "page_count"),
    ]`, notes: [{ at: "RenameField", text: "model, old name, new name" }] },
            { code: `class Migration(migrations.Migration):
    operations = [
        migrations.AlterField(
            "book", "title", models.CharField(max_length=300)
        ),
    ]`, notes: [{ at: "AlterField", text: "replaces the field definition" }] },
            { code: `class Migration(migrations.Migration):
    operations = [
        migrations.AddIndex(
            "book",
            models.Index(fields=["published"], name="book_pub_idx"),
        ),
    ]`, notes: [{ at: "AddIndex", text: "speeds up lookups on the column" }] },
            { code: `class Migration(migrations.Migration):
    operations = [
        migrations.DeleteModel("review"),
    ]`, notes: [{ at: "DeleteModel", text: "drops the table" }] }
          ]
        },
        {
          id: "data-migrations", n: 3, title: "data migrations", level: 3,
          gloss: "Moves data with RunPython functions that load models through apps.get_model.",
          examples: [
            { code: `def fill_slugs(apps, schema_editor):
    Book = apps.get_model("library", "Book")
    for book in Book.objects.filter(slug=""):
        book.slug = slugify(book.title)
        book.save(update_fields=["slug"])

class Migration(migrations.Migration):
    operations = [
        migrations.RunPython(fill_slugs, migrations.RunPython.noop),
    ]`, notes: [{ at: "apps.get_model", text: "historical model, not the import" }, { at: "RunPython.noop", text: "makes the step reversible" }] },
            { code: `def mark_unrated(apps, schema_editor):
    Book = apps.get_model("library", "Book")
    Book.objects.filter(rating__isnull=True).update(rating=0)

class Migration(migrations.Migration):
    operations = [migrations.RunPython(mark_unrated)]`, notes: [{ at: "update(rating=0)", text: "one query for all rows" }] },
            { code: `class Migration(migrations.Migration):
    operations = [
        migrations.RunSQL(
            "UPDATE library_book SET in_stock = 0 WHERE pages = 0",
            reverse_sql=migrations.RunSQL.noop,
        ),
    ]`, notes: [{ at: "RunSQL", text: "raw statement run as written" }] }
          ]
        },
        {
          id: "management-commands", n: 4, title: "custom commands", level: 2,
          gloss: "Adds a manage.py command by subclassing BaseCommand and writing handle.",
          examples: [
            { code: `class Command(BaseCommand):
    help = "Print the number of books"

    def handle(self, *args, **options):
        self.stdout.write(str(Book.objects.count()))`, notes: [{ at: "handle", text: "runs when the command is called" }, { at: "self.stdout", text: "output stream you can capture" }] },
            { code: `class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("genre")
        parser.add_argument("--limit", type=int, default=5)

    def handle(self, *args, **options):
        books = Book.objects.filter(genre__name=options["genre"])
        for book in books[: options["limit"]]:
            self.stdout.write(book.title)`, notes: [{ at: "add_arguments", text: "declares positionals and options" }] },
            { code: `class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("book_id", type=int)

    def handle(self, *args, **options):
        if not Book.objects.filter(pk=options["book_id"]).exists():
            raise CommandError("no such book")`, notes: [{ at: "CommandError", text: "prints a message and exits nonzero" }] },
            { code: `class Command(BaseCommand):
    def handle(self, *args, **options):
        count = Book.objects.filter(in_stock=False).delete()[0]
        self.stdout.write(self.style.SUCCESS(f"removed {count}"))`, notes: [{ at: "style.SUCCESS", text: "colours the line green" }] }
          ]
        },
        {
          id: "call-command", n: 5, title: "running commands from code", level: 3,
          gloss: "Runs management commands from Python with call_command and keyword options.",
          examples: [
            { code: `call_command("check")`, notes: [{ at: "call_command", text: "same as manage.py check" }] },
            { code: `out = StringIO()
call_command("dumpdata", "library.genre", indent=2, stdout=out)
print(out.getvalue())`, notes: [{ at: "stdout=out", text: "captures what the command writes" }] },
            { code: `call_command("showmigrations", "library")`, notes: [{ at: "\"library\"", text: "limits output to one app" }] },
            { code: `execute_from_command_line(["manage.py", "check"])`, notes: [{ at: "execute_from_command_line", text: "the body of manage.py" }] }
          ]
        }
      ]
    },
    {
      id: "function-views",
      n: 6,
      title: "function views",
      concepts: [
        {
          id: "basic-responses", n: 1, title: "returning responses", level: 1,
          gloss: "Returns an HttpResponse, JsonResponse or redirect from a function that takes a request.",
          examples: [
            { code: `def hello(request):
    return HttpResponse("Hello from the library")`, notes: [{ at: "HttpResponse", text: "assumes the usual imports and models" }] },
            { code: `def book_count(request):
    return JsonResponse({"books": Book.objects.count()})`, notes: [{ at: "JsonResponse", text: "serializes a dict to json" }] },
            { code: `def home(request):
    return redirect("book-list")`, notes: [{ at: "redirect", text: "accepts a url name" }] },
            { code: `def not_ready(request):
    response = HttpResponse("try again later", status=503)
    response["Retry-After"] = "120"
    return response`, notes: [{ at: "status=503", text: "sets the http status code" }, { at: "response[\"Retry-After\"]", text: "headers behave like a dict" }] }
          ]
        },
        {
          id: "render-templates", n: 2, title: "rendering templates", level: 1,
          gloss: "Fills a template with a context dictionary through render().",
          examples: [
            { code: `def book_list(request):
    books = Book.objects.order_by("title")
    return render(request, "books/list.html", {"books": books})`, notes: [{ at: "render(", text: "returns a response object" }, { at: "{\"books\": books}", text: "names the template can use" }] },
            { code: `def book_detail(request, pk):
    book = Book.objects.get(pk=pk)
    context = {"book": book, "reviews": book.reviews.all()}
    return render(request, "books/detail.html", context)`, notes: [{ at: "pk", text: "arrives from the url pattern" }] },
            { code: `def missing(request):
    return render(request, "errors/404.html", status=404)`, notes: [{ at: "status=404", text: "template with a custom status" }] },
            { code: `def export_titles(request):
    titles = "\\n".join(Book.objects.values_list("title", flat=True))
    return HttpResponse(titles, content_type="text/plain")`, notes: [{ at: "content_type", text: "serves plain text, not html" }] }
          ]
        },
        {
          id: "request-data", n: 3, title: "reading the request", level: 2,
          gloss: "Reads query strings, form data and headers from the request object.",
          examples: [
            { code: `def search(request):
    term = request.GET.get("q", "")
    books = Book.objects.filter(title__icontains=term)
    return render(request, "books/search.html", {"books": books})`, notes: [{ at: "request.GET", text: "query string parameters" }] },
            { code: `def add_tag(request):
    if request.method == "POST":
        Tag.objects.create(name=request.POST["name"])
        return redirect("book-list")
    return render(request, "tags/new.html")`, notes: [{ at: "request.method", text: "branches between get and post" }, { at: "request.POST", text: "parsed form fields" }] },
            { code: `def whoami(request):
    agent = request.headers.get("User-Agent", "unknown")
    ip = request.META["REMOTE_ADDR"]
    return JsonResponse({"agent": agent, "ip": ip})`, notes: [{ at: "request.headers", text: "case insensitive lookup" }] },
            { code: `def api_add_tag(request):
    data = json.loads(request.body)
    tag = Tag.objects.create(name=data["name"])
    return JsonResponse({"id": tag.pk}, status=201)`, notes: [{ at: "request.body", text: "raw bytes of the payload" }] }
          ]
        },
        {
          id: "shortcuts", n: 4, title: "shortcut helpers", level: 2,
          gloss: "Shortens common patterns with get_object_or_404, get_list_or_404 and redirect.",
          examples: [
            { code: `def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    return render(request, "books/detail.html", {"book": book})`, notes: [{ at: "get_object_or_404", text: "raises a 404 when missing" }] },
            { code: `def author_books(request, author_id):
    books = get_list_or_404(Book, author_id=author_id)
    return render(request, "books/list.html", {"books": books})`, notes: [{ at: "get_list_or_404", text: "404 on an empty list" }] },
            { code: `def by_slug(request, slug):
    books = Book.objects.select_related("author")
    book = get_object_or_404(books, slug=slug)
    data = {"title": book.title, "author": book.author.name}
    return JsonResponse(data)`, notes: [{ at: "books, slug=slug", text: "a queryset works as the source" }] },
            { code: `def jump(request, pk):
    book = get_object_or_404(Book, pk=pk)
    return redirect(book)`, notes: [{ at: "redirect(book)", text: "uses get_absolute_url" }] }
          ]
        },
        {
          id: "view-decorators", n: 5, title: "view decorators", level: 3,
          gloss: "Wraps views with decorators that limit methods, require login or cache the response.",
          examples: [
            { code: `@require_http_methods(["GET", "POST"])
def book_form(request):
    return render(request, "books/form.html")`, notes: [{ at: "require_http_methods", text: "other verbs get a 405" }] },
            { code: `@login_required
def dashboard(request):
    return render(request, "dashboard.html", {"user": request.user})`, notes: [{ at: "login_required", text: "redirects anonymous users" }] },
            { code: `@cache_page(60 * 15)
def book_count(request):
    return JsonResponse({"books": Book.objects.count()})`, notes: [{ at: "cache_page", text: "stores the response in the cache" }] },
            { code: `@csrf_exempt
@require_POST
def webhook(request):
    return HttpResponse(status=204)`, notes: [{ at: "csrf_exempt", text: "skips the csrf check" }, { at: "require_POST", text: "rejects every other method" }] }
          ]
        }
      ]
    },
    {
      id: "urls",
      n: 7,
      title: "URLs",
      concepts: [
        {
          id: "path-routes", n: 1, title: "path routes", level: 1,
          gloss: "Maps URL patterns to views with path() and typed converters.",
          examples: [
            { code: `urlpatterns = [
    path("", views.home, name="home"),
    path("books/", views.book_list, name="book-list"),
]`, notes: [{ at: "path(", text: "assumes a views module is imported" }, { at: "name=", text: "lets reverse find the route" }] },
            { code: `urlpatterns = [
    path("books/<int:pk>/", views.book_detail, name="book-detail"),
]`, notes: [{ at: "<int:pk>", text: "captures digits as an int" }] },
            { code: `urlpatterns = [
    path("authors/<slug:slug>/", views.author, name="author"),
    path("orders/<uuid:token>/", views.order, name="order"),
]`, notes: [{ at: "<slug:slug>", text: "letters, digits, hyphens" }, { at: "<uuid:token>", text: "parsed into a uuid object" }] },
            { code: `urlpatterns = [
    path("files/<path:subpath>", views.serve_file, name="file"),
    path("tags/<str:name>/", views.tag, name="tag"),
]`, notes: [{ at: "<path:subpath>", text: "may contain slashes" }] }
          ]
        },
        {
          id: "re-path-converters", n: 2, title: "regex and custom converters", level: 2,
          gloss: "Matches with re_path regular expressions or a registered custom converter.",
          examples: [
            { code: `urlpatterns = [
    re_path(r"^archive/(?P<year>[0-9]{4})/$", views.archive),
]`, notes: [{ at: "re_path", text: "full regular expression syntax" }, { at: "(?P<year>", text: "named group becomes a keyword" }] },
            { code: `class YearConverter:
    regex = "[0-9]{4}"
    to_python = int
    to_url = "{:04d}".format

register_converter(YearConverter, "year")`, notes: [{ at: "regex", text: "text the converter matches" }, { at: "register_converter", text: "makes year usable in paths" }] },
            { code: `class YearConverter:
    regex = "[0-9]{4}"
    to_python = int
    to_url = "{:04d}".format

register_converter(YearConverter, "year")
urlpatterns = [
    path("archive/<year:year>/", views.archive, name="archive"),
]`, notes: [] },
            { code: `urlpatterns = [
    re_path(r"^books/(?P<pk>[0-9]+)/$", views.book_detail),
    re_path(r"^tags/(?P<name>[\\w-]+)/$", views.tag),
]`, notes: [{ at: "[\\w-]+", text: "letters, digits, underscore, hyphen" }] }
          ]
        },
        {
          id: "include-namespaces", n: 3, title: "include and namespaces", level: 2,
          gloss: "Nests URL files with include and prefixes route names through app_name.",
          examples: [
            { code: `urlpatterns = [
    path("blog/", include("blog.urls")),
    path("shop/", include("shop.urls")),
]`, notes: [{ at: "include(", text: "mounts another urls module" }] },
            { code: `app_name = "library"
urlpatterns = [
    path("", views.book_list, name="book-list"),
    path("<int:pk>/", views.book_detail, name="book-detail"),
]`, notes: [{ at: "app_name", text: "reverse with library:book-list" }] },
            { code: `extra = [
    path("popular/", views.popular, name="popular"),
    path("recent/", views.recent, name="recent"),
]
urlpatterns = [path("books/", include(extra))]`, notes: [{ at: "include(extra)", text: "accepts a list directly" }] },
            { code: `urlpatterns = [
    path("shop/", include("shop.urls", namespace="store")),
]`, notes: [{ at: "namespace=", text: "instance name used in reverse" }] }
          ]
        },
        {
          id: "reverse-urls", n: 4, title: "reversing URLs", level: 3,
          gloss: "Builds URLs from route names with reverse, reverse_lazy and the url tag.",
          examples: [
            { code: `url = reverse("book-detail", args=[7])
print(url)`, notes: [{ at: "reverse(", text: "turns a name into a path" }] },
            { code: `url = reverse("book-detail", kwargs={"pk": 7})
print(url)`, notes: [{ at: "kwargs=", text: "match converters by name" }] },
            { code: `success_url = reverse_lazy("book-list")
print(str(success_url))`, notes: [{ at: "reverse_lazy", text: "safe at import time" }] },
            { code: `template = Template('<a href="{% url "book-detail" pk=3 %}">open</a>')
print(template.render(Context()))`, notes: [{ at: "{% url", text: "same lookup inside a template" }] }
          ]
        }
      ]
    },
    {
      id: "templates",
      n: 8,
      title: "templates",
      concepts: [
        {
          id: "template-rendering", n: 1, title: "rendering templates", level: 1,
          gloss: "Renders a template string or file with a context through Template and render_to_string.",
          examples: [
            { code: `template = Template("Hello {{ name }}")
print(template.render(Context({"name": "Ada"})))`, notes: [{ at: "Template(", text: "assumes the usual django imports" }, { at: "Context(", text: "supplies the variables" }] },
            { code: `books = Book.objects.order_by("title")
html = render_to_string("books/list.html", {"books": books})
print(len(html))`, notes: [{ at: "render_to_string", text: "loads a file and returns text" }] },
            { code: `request = RequestFactory().get("/books/")
context = {"books": []}
html = render_to_string("books/list.html", context, request=request)
print(len(html))`, notes: [{ at: "request=request", text: "enables context processors" }] },
            { code: `template = get_template("books/detail.html")
print(template.render({"book": Book.objects.get(pk=1)}))`, notes: [{ at: "get_template", text: "returns a reusable template object" }] }
          ]
        },
        {
          id: "filters", n: 2, title: "filters", level: 1,
          gloss: "Formats values inside the template with filters such as upper, date and default.",
          examples: [
            { code: `template = Template(
    "{{ title|upper }} by {{ author|default:'unknown' }}"
)
print(template.render(Context({"title": "dune"})))`, notes: [{ at: "|upper", text: "filters chain with a pipe" }, { at: "default:", text: "used when the value is empty" }] },
            { code: `template = Template("{{ published|date:'Y-m-d' }}")
print(template.render(Context({"published": date(1965, 8, 1)})))`, notes: [{ at: "date:", text: "takes a format string" }] },
            { code: `template = Template(
    "{{ tags|join:', ' }} {{ summary|truncatechars:20 }}"
)
context = Context({"tags": ["epic", "desert"], "summary": "x" * 50})
print(template.render(context))`, notes: [{ at: "join:", text: "glues a list with a separator" }] },
            { code: `template = Template(
    "{{ price|floatformat:2 }} item{{ count|pluralize }}"
)
print(template.render(Context({"price": 9.5, "count": 3})))`, notes: [] }
          ]
        },
        {
          id: "template-tags", n: 3, title: "template tags", level: 2,
          gloss: "Controls output with for, if, with and static tags.",
          examples: [
            { code: `template = Template(
    "{% for book in books %}{{ forloop.counter }}. {{ book }} "
    "{% empty %}no books{% endfor %}"
)
print(template.render(Context({"books": ["Dune", "Kindred"]})))`, notes: [{ at: "forloop.counter", text: "counts from one" }, { at: "{% empty %}", text: "shown for an empty list" }] },
            { code: `template = Template(
    "{% if stock > 10 %}plenty{% elif stock > 0 %}few"
    "{% else %}sold out{% endif %}"
)
print(template.render(Context({"stock": 4})))`, notes: [{ at: "elif", text: "extra branch between if and else" }] },
            { code: `template = Template(
    "{% with total=books|length %}{{ total }} books{% endwith %}"
)
print(template.render(Context({"books": [1, 2, 3]})))`, notes: [{ at: "with", text: "names a value for the block" }] },
            { code: `template = Template(
    '{% load static %}<link href="{% static "app.css" %}">'
)
print(template.render(Context()))`, notes: [{ at: "load static", text: "needed before the static tag" }] }
          ]
        },
        {
          id: "inheritance", n: 4, title: "template inheritance", level: 2,
          gloss: "Shares a layout through extends, block and include.",
          examples: [
            { code: `templates = {
    "base.html": "<h1>{% block title %}{% endblock %}</h1>",
    "home.html": (
        "{% extends 'base.html' %}{% block title %}Home{% endblock %}"
    ),
}
loader = ("django.template.loaders.locmem.Loader", templates)
print(Engine(loaders=[loader]).render_to_string("home.html"))`, notes: [{ at: "extends", text: "must be the first tag" }, { at: "block title", text: "slot the child can fill" }] },
            { code: `templates = {
    "base.html": "<title>{% block title %}Site{% endblock %}</title>",
    "page.html": (
        "{% extends 'base.html' %}"
        "{% block title %}{{ block.super }}: Books{% endblock %}"
    ),
}
loader = ("django.template.loaders.locmem.Loader", templates)
print(Engine(loaders=[loader]).render_to_string("page.html"))`, notes: [{ at: "block.super", text: "keeps the parent content" }] },
            { code: `templates = {
    "card.html": "<li>{{ book }}</li>",
    "list.html": (
        "{% for book in books %}{% include 'card.html' %}{% endfor %}"
    ),
}
loader = ("django.template.loaders.locmem.Loader", templates)
engine = Engine(loaders=[loader])
print(engine.render_to_string("list.html", {"books": ["Dune"]}))`, notes: [{ at: "include", text: "renders another file in place" }] }
          ]
        },
        {
          id: "custom-tags", n: 5, title: "custom tags and filters", level: 3,
          gloss: "Registers custom filters and tags on a template Library object.",
          examples: [
            { code: `register = template.Library()

@register.filter
def initials(value):
    return "".join(word[0] for word in value.split())`, notes: [{ at: "template.Library", text: "one per tags module" }, { at: "@register.filter", text: "usable as name|initials" }] },
            { code: `register = template.Library()

@register.simple_tag
def book_total():
    return Book.objects.count()`, notes: [{ at: "simple_tag", text: "returns a value to print" }] },
            { code: `register = template.Library()

@register.simple_tag(takes_context=True)
def current_user(context):
    return context["request"].user.get_username()`, notes: [{ at: "takes_context", text: "gives the tag the context first" }] },
            { code: `register = template.Library()

@register.inclusion_tag("books/card.html")
def book_card(book):
    return {"book": book}`, notes: [{ at: "inclusion_tag", text: "renders a template with this dict" }] }
          ]
        }
      ]
    },
    {
      id: "forms-modelforms",
      n: 9,
      title: "forms & ModelForms",
      concepts: [
        {
          id: "form-class", n: 1, title: "form classes", level: 1,
          gloss: "Declares form fields as class attributes on a Form subclass.",
          examples: [
            { code: `class ContactForm(forms.Form):
    name = forms.CharField(max_length=80)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)`, notes: [{ at: "forms.Form", text: "assumes the usual imports and models" }, { at: "widget=", text: "controls the html input" }] },
            { code: `class SearchForm(forms.Form):
    q = forms.CharField(required=False)
    genre = forms.ModelChoiceField(Genre.objects.all(), required=False)
    in_stock = forms.BooleanField(required=False)`, notes: [{ at: "required=False", text: "field may be left empty" }, { at: "ModelChoiceField", text: "select built from a queryset" }] },
            { code: `class FilterForm(forms.Form):
    since = forms.DateField(
        widget=forms.DateInput(attrs={"type": "date"}),
        help_text="earliest publication date",
    )`, notes: [{ at: "attrs=", text: "extra html attributes" }] },
            { code: `class RatingForm(forms.Form):
    stars = forms.ChoiceField(choices=[(n, n) for n in range(1, 6)])
    comment = forms.CharField(required=False, label="Your comment")`, notes: [{ at: "choices=", text: "pairs of value and label" }] }
          ]
        },
        {
          id: "bound-forms", n: 2, title: "bound forms", level: 2,
          gloss: "Validates submitted data by binding it to the form and reading cleaned_data.",
          examples: [
            { code: `class RatingForm(forms.Form):
    stars = forms.IntegerField(min_value=1, max_value=5)

form = RatingForm({"stars": "4"})
print(form.is_valid(), form.cleaned_data)`, notes: [{ at: "is_valid()", text: "runs every validation step" }, { at: "cleaned_data", text: "python values after validation" }] },
            { code: `class RatingForm(forms.Form):
    stars = forms.IntegerField(min_value=1, max_value=5)

form = RatingForm({"stars": "9"})
print(form.is_valid(), form.errors.as_json())`, notes: [{ at: "form.errors", text: "messages keyed by field name" }] },
            { code: `class RatingForm(forms.Form):
    stars = forms.IntegerField(initial=3)

form = RatingForm()
print(form.as_p())`, notes: [{ at: "initial=", text: "value shown in an unbound form" }] },
            { code: `class NoteForm(forms.Form):
    body = forms.CharField()

form = NoteForm(initial={"body": "draft"})
print(form["body"].value())`, notes: [{ at: "form[\"body\"]", text: "one bound field for rendering" }] }
          ]
        },
        {
          id: "form-validation", n: 3, title: "validation", level: 2,
          gloss: "Rejects bad input with per field methods, a form level check and validators.",
          examples: [
            { code: `class SignupForm(forms.Form):
    username = forms.CharField(max_length=30)

    def clean_username(self):
        username = self.cleaned_data["username"]
        if username.lower() == "admin":
            raise forms.ValidationError("reserved name")
        return username`, notes: [{ at: "clean_username", text: "runs for that field only" }, { at: "ValidationError", text: "attaches a message to the field" }] },
            { code: `class DateRangeForm(forms.Form):
    start = forms.DateField()
    end = forms.DateField()

    def clean_end(self):
        end = self.cleaned_data["end"]
        start = self.cleaned_data.get("start")
        if start and end < start:
            raise forms.ValidationError("end is before start")
        return end`, notes: [{ at: "cleaned_data.get", text: "earlier fields are already cleaned" }] },
            { code: `class PhoneForm(forms.Form):
    number = forms.CharField(
        validators=[RegexValidator(r"^[0-9]{10}$", "ten digits")],
    )`, notes: [{ at: "validators=", text: "reusable checks for one field" }] },
            { code: `class DateRangeForm(forms.Form):
    start = forms.DateField()
    end = forms.DateField()

form = DateRangeForm({"start": "2024-05-01", "end": "2024-04-01"})
form.is_valid()
form.add_error("end", "must follow the start date")
print(form.errors)`, notes: [{ at: "add_error", text: "attaches a message to one field" }] }
          ]
        },
        {
          id: "model-form", n: 4, title: "model forms", level: 3,
          gloss: "Builds a form from a model with ModelForm, Meta.model and Meta.fields.",
          examples: [
            { code: `class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ["title", "author", "price"]`, notes: [{ at: "fields =", text: "lists the editable columns" }] },
            { code: `class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        exclude = ["rating"]
        widgets = {"published": forms.DateInput(attrs={"type": "date"})}
        labels = {"pages": "Page count"}`, notes: [{ at: "exclude", text: "everything except these fields" }] },
            { code: `class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ["title", "author", "price"]

form = BookForm({"title": "Lavinia", "author": 2, "price": "11.50"})
if form.is_valid():
    book = form.save()`, notes: [{ at: "form.save()", text: "inserts or updates the row" }] },
            { code: `class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ["title", "author"]

form = BookForm({"title": "Lavinia", "author": 2})
book = form.save(commit=False) if form.is_valid() else None`, notes: [{ at: "commit=False", text: "returns the unsaved instance" }] }
          ]
        },
        {
          id: "form-views", n: 5, title: "forms in views", level: 2,
          gloss: "Handles GET and POST in one view and re-renders the form when it is invalid.",
          examples: [
            { code: `class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ["title", "author", "price"]

def book_create(request):
    form = BookForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("book-list")
    return render(request, "books/form.html", {"form": form})`, notes: [{ at: "request.POST or None", text: "unbound on a plain get" }] },
            { code: `class ContactForm(forms.Form):
    message = forms.CharField()

def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            return redirect("home")
    else:
        form = ContactForm()
    return render(request, "contact.html", {"form": form})`, notes: [{ at: "else:", text: "a fresh form for the first visit" }] },
            { code: `class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ["title", "price"]

def edit_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    form = BookForm(request.POST or None, instance=book)
    if form.is_valid():
        form.save()
        return redirect(book)
    return render(request, "books/form.html", {"form": form})`, notes: [{ at: "instance=book", text: "edits the existing row" }] }
          ]
        }
      ]
    },
    {
      id: "admin",
      n: 10,
      title: "admin",
      concepts: [
        {
          id: "register-models", n: 1, title: "registering models", level: 1,
          gloss: "Registers a model with the admin site so staff can create and edit rows.",
          examples: [
            { code: `admin.site.register(Book)`, notes: [{ at: "admin.site", text: "assumes the usual imports and models" }] },
            { code: `@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    pass`, notes: [{ at: "@admin.register", text: "decorator form of register" }] },
            { code: `admin.site.register([Genre, Tag])`, notes: [{ at: "[Genre, Tag]", text: "several models in one call" }] },
            { code: `admin.site.site_header = "Library administration"
admin.site.site_title = "Library"
admin.site.index_title = "Catalogue"`, notes: [{ at: "site_header", text: "text at the top of every page" }] }
          ]
        },
        {
          id: "list-options", n: 2, title: "change list options", level: 2,
          gloss: "Shapes the change list with list_display, list_filter, search_fields and ordering.",
          examples: [
            { code: `@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "price", "in_stock"]
    list_filter = ["genre", "in_stock"]
    search_fields = ["title", "author__name"]`, notes: [{ at: "list_display", text: "columns in the table" }, { at: "list_filter", text: "sidebar filters" }] },
            { code: `@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["title", "price", "in_stock"]
    list_editable = ["price", "in_stock"]
    date_hierarchy = "published"
    list_per_page = 25`, notes: [{ at: "list_editable", text: "edit cells without opening rows" }, { at: "date_hierarchy", text: "date drill down above the list" }] },
            { code: `@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "genre"]
    list_select_related = ["author", "genre"]
    ordering = ["title"]`, notes: [{ at: "list_select_related", text: "avoids one query per row" }] },
            { code: `@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ["name", "book_count"]

    @admin.display(description="books")
    def book_count(self, obj):
        return obj.books.count()`, notes: [{ at: "@admin.display", text: "labels a computed column" }] }
          ]
        },
        {
          id: "edit-form", n: 3, title: "edit form options", level: 2,
          gloss: "Arranges the edit form with fieldsets, readonly_fields and prepopulated_fields.",
          examples: [
            { code: `@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Main", {"fields": ["title", "author"]}),
        ("Details", {"classes": ["collapse"], "fields": ["price"]}),
    ]`, notes: [{ at: "fieldsets", text: "groups fields under headings" }] },
            { code: `@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ["title"]}
    readonly_fields = ["rating"]`, notes: [{ at: "prepopulated_fields", text: "fills the slug while typing" }, { at: "readonly_fields", text: "shown but not editable" }] },
            { code: `@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    raw_id_fields = ["author"]`, notes: [{ at: "raw_id_fields", text: "id box instead of a long select" }] },
            { code: `@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    filter_horizontal = ["tags"]`, notes: [{ at: "filter_horizontal", text: "two pane picker for many to many" }] }
          ]
        },
        {
          id: "inlines-actions", n: 4, title: "inlines and actions", level: 3,
          gloss: "Edits related rows inline and runs bulk operations through admin actions.",
          examples: [
            { code: `class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    inlines = [ReviewInline]`, notes: [{ at: "TabularInline", text: "related rows in a compact table" }, { at: "extra = 1", text: "one empty row ready to fill" }] },
            { code: `class ReviewInline(admin.StackedInline):
    model = Review
    fields = ["stars", "body"]
    max_num = 3

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    inlines = [ReviewInline]`, notes: [{ at: "StackedInline", text: "each row as a block of fields" }] },
            { code: `@admin.action(description="Mark selected books as in stock")
def mark_in_stock(modeladmin, request, queryset):
    queryset.update(in_stock=True)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    actions = [mark_in_stock]`, notes: [{ at: "queryset", text: "only the ticked rows" }] },
            { code: `@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    actions = ["discount"]

    @admin.action(description="Take 10 percent off")
    def discount(self, request, queryset):
        queryset.update(price=F("price") * Decimal("0.9"))`, notes: [{ at: "\"discount\"", text: "a method name works as an action" }] }
          ]
        }
      ]
    },
    {
      id: "class-based-views",
      n: 11,
      title: "class-based views",
      concepts: [
        {
          id: "base-views", n: 1, title: "base views", level: 1,
          gloss: "Handles each HTTP method with a class method on View, TemplateView or RedirectView.",
          examples: [
            { code: `class PingView(View):
    def get(self, request):
        return JsonResponse({"ok": True})`, notes: [{ at: "View", text: "assumes the usual imports and models" }, { at: "def get", text: "method name picks the verb" }] },
            { code: `class AboutView(TemplateView):
    template_name = "about.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["books"] = Book.objects.count()
        return context`, notes: [{ at: "get_context_data", text: "adds names for the template" }] },
            { code: `class OldListView(RedirectView):
    pattern_name = "book-list"
    permanent = True`, notes: [{ at: "pattern_name", text: "redirect target by route name" }] },
            { code: `class ExportView(View):
    http_method_names = ["get"]

    def get(self, request):
        return HttpResponse("a,b", content_type="text/csv")`, notes: [{ at: "http_method_names", text: "other verbs get a 405" }] }
          ]
        },
        {
          id: "display-views", n: 2, title: "list and detail views", level: 2,
          gloss: "Lists or shows rows with ListView and DetailView using a model or queryset.",
          examples: [
            { code: `class BookListView(ListView):
    model = Book
    paginate_by = 10
    ordering = ["title"]`, notes: [{ at: "paginate_by", text: "page size, adds page_obj" }, { at: "ListView", text: "template book_list.html by default" }] },
            { code: `class BookDetailView(DetailView):
    queryset = Book.objects.select_related("author")
    context_object_name = "book"`, notes: [{ at: "context_object_name", text: "template variable name" }] },
            { code: `class SearchView(ListView):
    model = Book

    def get_queryset(self):
        term = self.request.GET.get("q", "")
        return Book.objects.filter(title__icontains=term)`, notes: [{ at: "get_queryset", text: "builds rows per request" }] },
            { code: `class AuthorDetailView(DetailView):
    model = Author
    slug_field = "name"
    slug_url_kwarg = "name"`, notes: [{ at: "slug_field", text: "column used for lookup" }] }
          ]
        },
        {
          id: "edit-views", n: 3, title: "create, update and delete views", level: 2,
          gloss: "Saves forms with CreateView, UpdateView and DeleteView and a success_url.",
          examples: [
            { code: `class BookCreateView(CreateView):
    model = Book
    fields = ["title", "author", "price"]
    success_url = reverse_lazy("book-list")`, notes: [{ at: "fields", text: "builds a model form for you" }, { at: "reverse_lazy", text: "resolved after urls load" }] },
            { code: `class BookUpdateView(UpdateView):
    model = Book
    fields = ["title", "price", "in_stock"]
    template_name = "books/form.html"`, notes: [{ at: "template_name", text: "shared with the create view" }] },
            { code: `class BookDeleteView(DeleteView):
    model = Book
    success_url = reverse_lazy("book-list")`, notes: [{ at: "DeleteView", text: "confirms on get, deletes on post" }] },
            { code: `class BookCreateView(CreateView):
    model = Book
    fields = ["title", "author"]
    success_url = reverse_lazy("book-list")

    def form_valid(self, form):
        form.instance.in_stock = True
        return super().form_valid(form)`, notes: [{ at: "form_valid", text: "runs after validation passes" }] }
          ]
        },
        {
          id: "view-mixins", n: 4, title: "mixins", level: 3,
          gloss: "Adds login checks and shared behaviour by mixing classes in before the view.",
          examples: [
            { code: `class MyBooksView(LoginRequiredMixin, ListView):
    model = Book
    login_url = "/accounts/login/"`, notes: [{ at: "LoginRequiredMixin", text: "must come before the view class" }] },
            { code: `class StaffOnlyView(UserPassesTestMixin, TemplateView):
    template_name = "staff.html"

    def test_func(self):
        return self.request.user.is_staff`, notes: [{ at: "test_func", text: "return true to allow access" }] },
            { code: `class BookAdminView(PermissionRequiredMixin, ListView):
    model = Book
    permission_required = "library.change_book"`, notes: [{ at: "permission_required", text: "app label and codename" }] },
            { code: `class StatsMixin:
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["total"] = Book.objects.count()
        return context

class HomeView(StatsMixin, TemplateView):
    template_name = "home.html"`, notes: [{ at: "StatsMixin", text: "reusable context for many views" }] }
          ]
        }
      ]
    },
    {
      id: "middleware-signals",
      n: 12,
      title: "middleware & signals",
      concepts: [
        {
          id: "function-middleware", n: 1, title: "function middleware", level: 1,
          gloss: "Wraps every request in a function that receives get_response and returns a handler.",
          examples: [
            { code: `def timing_middleware(get_response):
    def middleware(request):
        started = time.monotonic()
        response = get_response(request)
        response["X-Elapsed"] = f"{time.monotonic() - started:.3f}"
        return response
    return middleware`, notes: [{ at: "get_response", text: "assumes the usual imports" }, { at: "X-Elapsed", text: "custom response header" }] },
            { code: `def api_key_middleware(get_response):
    def middleware(request):
        if not request.headers.get("X-Api-Key"):
            return HttpResponse(status=401)
        return get_response(request)
    return middleware`, notes: [{ at: "return HttpResponse", text: "short circuits the chain" }] },
            { code: `def tenant_middleware(get_response):
    def middleware(request):
        request.tenant = request.get_host().split(".")[0]
        return get_response(request)
    return middleware`, notes: [{ at: "request.tenant", text: "attribute later code can read" }] },
            { code: `def noindex_middleware(get_response):
    def middleware(request):
        response = get_response(request)
        response.headers["X-Robots-Tag"] = "noindex"
        return response
    return middleware`, notes: [{ at: "response.headers", text: "set after the view runs" }] }
          ]
        },
        {
          id: "class-middleware", n: 2, title: "class middleware", level: 2,
          gloss: "Implements middleware as a class with __init__, __call__ and optional hooks.",
          examples: [
            { code: `class RequestCounterMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.count = 0

    def __call__(self, request):
        self.count += 1
        return self.get_response(request)`, notes: [{ at: "__init__", text: "runs once at startup" }, { at: "__call__", text: "runs for every request" }] },
            { code: `class LoggingMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        print(request.path, view_func.__name__)`, notes: [{ at: "MiddlewareMixin", text: "supplies init and call" }, { at: "process_view", text: "runs just before the view" }] },
            { code: `class ErrorPageMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        return HttpResponse("something broke", status=500)`, notes: [{ at: "process_exception", text: "turns an error into a response" }] },
            { code: `class ContextMiddleware(MiddlewareMixin):
    def process_template_response(self, request, response):
        response.context_data["site"] = "Booknook"
        return response`, notes: [{ at: "process_template_response", text: "edits the context late" }] }
          ]
        },
        {
          id: "signal-receivers", n: 3, title: "signal receivers", level: 2,
          gloss: "Reacts to model events with receivers connected to post_save, pre_delete and m2m_changed.",
          examples: [
            { code: `@receiver(post_save, sender=Book)
def announce_book(sender, instance, created, **kwargs):
    if created:
        print(f"new book: {instance.title}")`, notes: [{ at: "@receiver", text: "assumes the usual imports and models" }, { at: "created", text: "true on insert, false on update" }] },
            { code: `@receiver(pre_delete, sender=Author)
def archive_author(sender, instance, **kwargs):
    count = instance.books.count()
    print(f"removing {instance.name} with {count} books")`, notes: [{ at: "pre_delete", text: "fires before the row goes" }] },
            { code: `@receiver(m2m_changed, sender=Book.tags.through)
def count_tags(sender, instance, action, **kwargs):
    if action == "post_add":
        instance.rating = instance.tags.count()
        instance.save(update_fields=["rating"])`, notes: [{ at: "Book.tags.through", text: "the join model is the sender" }, { at: "post_add", text: "after rows were inserted" }] },
            { code: `def log_review(sender, instance, **kwargs):
    print(f"review of {instance.book} saved")

post_save.connect(log_review, sender=Review)`, notes: [{ at: "connect", text: "same as the decorator form" }] }
          ]
        },
        {
          id: "custom-signals", n: 4, title: "custom signals", level: 3,
          gloss: "Defines a Signal, connects receivers and sends it with the arguments they expect.",
          examples: [
            { code: `book_borrowed = Signal()

@receiver(book_borrowed)
def log_borrow(sender, book, **kwargs):
    print(f"{book.title} borrowed")
book_borrowed.send(sender=None, book=Book.objects.first())`, notes: [{ at: "Signal()", text: "a new event others can listen to" }, { at: "send(", text: "calls every receiver in turn" }] },
            { code: `class LibraryConfig(AppConfig):
    name = "library"

    def ready(self):
        from . import signals`, notes: [{ at: "ready", text: "runs once the app registry is loaded" }, { at: "import signals", text: "connects the receivers there" }] },
            { code: `def broken(sender, **kwargs):
    raise RuntimeError("receiver failed")

book_borrowed = Signal()
book_borrowed.connect(broken)
results = book_borrowed.send_robust(sender=None)
print(results[0][1])`, notes: [{ at: "send_robust", text: "returns errors instead of raising" }] },
            { code: `def on_book_saved(sender, instance, **kwargs):
    print(instance.title)

post_save.connect(on_book_saved, sender=Book, dispatch_uid="book-saved")`, notes: [{ at: "dispatch_uid", text: "stops duplicate connections" }] }
          ]
        }
      ]
    },
    {
      id: "settings",
      n: 13,
      title: "settings",
      concepts: [
        {
          id: "core-settings", n: 1, title: "core settings", level: 1,
          gloss: "Sets debugging, secrets, hosts and installed apps in the settings module.",
          examples: [
            { code: `DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
SECRET_KEY = "dev-only-secret-key"`, notes: [{ at: "DEBUG", text: "assumes the usual imports in settings.py" }, { at: "ALLOWED_HOSTS", text: "hostnames the site may serve" }] },
            { code: `INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "library",
]`, notes: [{ at: "\"library\"", text: "project apps go after django apps" }] },
            { code: `BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = os.environ.get("DJANGO_DEBUG", "0") == "1"
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]`, notes: [{ at: "BASE_DIR", text: "project root as a path object" }, { at: "os.environ", text: "keeps secrets out of the code" }] },
            { code: `ROOT_URLCONF = "mysite.urls"
WSGI_APPLICATION = "mysite.wsgi.application"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"`, notes: [{ at: "ROOT_URLCONF", text: "module holding urlpatterns" }] }
          ]
        },
        {
          id: "databases-caches", n: 2, title: "databases and caches", level: 2,
          gloss: "Configures the default database and cache backends with the DATABASES and CACHES dicts.",
          examples: [
            { code: `DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}`, notes: [{ at: "sqlite3", text: "file based, no server needed" }] },
            { code: `DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DB_NAME", "library"),
        "USER": os.environ.get("DB_USER", "library"),
        "HOST": os.environ.get("DB_HOST", "localhost"),
        "CONN_MAX_AGE": 60,
    }
}`, notes: [{ at: "CONN_MAX_AGE", text: "seconds to keep a connection" }] },
            { code: `CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "library-cache",
    }
}`, notes: [{ at: "LocMemCache", text: "per process memory cache" }] },
            { code: `DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        "ATOMIC_REQUESTS": True,
    }
}`, notes: [{ at: "ATOMIC_REQUESTS", text: "wraps each view in a transaction" }] }
          ]
        },
        {
          id: "static-media", n: 3, title: "static and media files", level: 2,
          gloss: "Sets where static assets and user uploads are served from and stored.",
          examples: [
            { code: `STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"`, notes: [{ at: "STATIC_ROOT", text: "target of collectstatic" }, { at: "STATICFILES_DIRS", text: "extra source folders" }] },
            { code: `MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"`, notes: [{ at: "MEDIA_ROOT", text: "where uploads are written" }] },
            { code: `STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage."
        "StaticFilesStorage",
    },
}`, notes: [{ at: "StaticFilesStorage", text: "copies files as they are" }] }
          ]
        },
        {
          id: "security-logging", n: 4, title: "security and logging", level: 3,
          gloss: "Hardens deployments with SECURE_ settings and routes log output through LOGGING.",
          examples: [
            { code: `SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 3600`, notes: [{ at: "SECURE_SSL_REDIRECT", text: "sends http traffic to https" }] },
            { code: `LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "INFO"},
}`, notes: [{ at: "\"version\": 1", text: "only valid schema version" }] },
            { code: `AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation."
        "MinimumLengthValidator"
    },
    {
        "NAME": "django.contrib.auth.password_validation."
        "CommonPasswordValidator"
    },
]`, notes: [{ at: "MinimumLengthValidator", text: "eight characters by default" }] },
            { code: `LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True`, notes: [{ at: "USE_TZ", text: "stores aware datetimes" }] }
          ]
        },
        {
          id: "auth-middleware", n: 5, title: "middleware and login settings", level: 3,
          gloss: "Orders the MIDDLEWARE stack and sets login and session behaviour.",
          examples: [
            { code: `MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
]`, notes: [{ at: "MIDDLEWARE", text: "top to bottom on the way in" }] },
            { code: `MIDDLEWARE = [
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "library.middleware.TimingMiddleware",
]`, notes: [{ at: "library.middleware", text: "dotted path to your class" }] },
            { code: `LOGIN_URL = "login"
LOGIN_REDIRECT_URL = "book-list"
LOGOUT_REDIRECT_URL = "home"`, notes: [{ at: "LOGIN_URL", text: "where login_required sends users" }] },
            { code: `SESSION_COOKIE_AGE = 60 * 60 * 24 * 14
SESSION_ENGINE = "django.contrib.sessions.backends.db"
SESSION_EXPIRE_AT_BROWSER_CLOSE = False`, notes: [{ at: "SESSION_COOKIE_AGE", text: "lifetime in seconds" }] }
          ]
        }
      ]
    },
    {
      id: "testing",
      n: 14,
      title: "testing",
      concepts: [
        {
          id: "test-cases", n: 1, title: "test cases", level: 1,
          gloss: "Groups checks in TestCase classes and builds fixtures with setUp and setUpTestData.",
          examples: [
            { code: `class BookModelTests(TestCase):
    def test_str_returns_title(self):
        book = Book(title="Dune")
        self.assertEqual(str(book), "Dune")`, notes: [{ at: "TestCase", text: "assumes the usual imports and models" }, { at: "test_", text: "prefix marks a test method" }] },
            { code: `class BookQueryTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        author = Author.objects.create(name="Ada Palmer")
        cls.book = Book.objects.create(title="Too Like", author=author)

    def test_count(self):
        self.assertEqual(Book.objects.count(), 1)`, notes: [{ at: "setUpTestData", text: "runs once per class" }] },
            { code: `class ReviewTests(TestCase):
    def setUp(self):
        author = Author.objects.create(name="Octavia Butler")
        self.book = Book.objects.create(title="Kindred", author=author)

    def test_no_reviews_yet(self):
        self.assertEqual(self.book.reviews.count(), 0)`, notes: [{ at: "setUp", text: "runs before every test" }] },
            { code: `class SlugTests(SimpleTestCase):
    def test_slugify(self):
        self.assertEqual(slugify("Hello World"), "hello-world")`, notes: [{ at: "SimpleTestCase", text: "no database access allowed" }] }
          ]
        },
        {
          id: "test-client", n: 2, title: "test client", level: 2,
          gloss: "Exercises views with self.client.get, post and assertContains.",
          examples: [
            { code: `class BookListTests(TestCase):
    def test_lists_titles(self):
        author = Author.objects.create(name="Octavia Butler")
        Book.objects.create(title="Kindred", author=author)
        response = self.client.get(reverse("book-list"))
        self.assertContains(response, "Kindred")`, notes: [{ at: "self.client", text: "fake browser, no server needed" }, { at: "assertContains", text: "checks status and body text" }] },
            { code: `class BookDetailTests(TestCase):
    def test_unknown_book_is_404(self):
        response = self.client.get("/books/999/")
        self.assertEqual(response.status_code, 404)`, notes: [{ at: "status_code", text: "compare with the expected status" }] },
            { code: `class BookCreateTests(TestCase):
    def test_create_redirects(self):
        user = User.objects.create_user("ada", password="pw")
        author = Author.objects.create(name="Ada Palmer")
        self.client.force_login(user)
        data = {"title": "New", "author": author.pk, "price": "9.99"}
        response = self.client.post(reverse("book-create"), data)
        self.assertRedirects(response, reverse("book-list"))`, notes: [{ at: "force_login", text: "skips the password check" }, { at: "assertRedirects", text: "checks target and status code" }] },
            { code: `class AccessTests(TestCase):
    def test_login_required(self):
        response = self.client.get(reverse("book-create"))
        self.assertEqual(response.status_code, 302)
        self.assertIn("/accounts/login/", response["Location"])`, notes: [{ at: "response[\"Location\"]", text: "redirect target url" }] }
          ]
        },
        {
          id: "test-assertions", n: 3, title: "assertions", level: 2,
          gloss: "Asserts on querysets, exceptions and query counts with the TestCase helpers.",
          examples: [
            { code: `class PriceTests(TestCase):
    def test_cheap_books(self):
        author = Author.objects.create(name="Ada Palmer")
        Book.objects.create(title="Cheap", author=author, price=5)
        cheap = Book.objects.filter(price__lt=10)
        self.assertQuerySetEqual(
            cheap, ["Cheap"], transform=lambda b: b.title
        )`, notes: [{ at: "assertQuerySetEqual", text: "compares after a transform" }] },
            { code: `class ValidationTests(TestCase):
    def test_blank_title_is_invalid(self):
        with self.assertRaises(ValidationError):
            Book(title="").full_clean()`, notes: [{ at: "assertRaises", text: "passes only if the error occurs" }, { at: "full_clean", text: "runs field validators" }] },
            { code: `class QueryCountTests(TestCase):
    def test_select_related_uses_one_query(self):
        with self.assertNumQueries(1):
            list(Book.objects.select_related("author"))`, notes: [{ at: "assertNumQueries", text: "fails on extra queries" }] },
            { code: `class RoundingTests(SimpleTestCase):
    def test_prices(self):
        for price, expected in [(1, "1.00"), (2.5, "2.50")]:
            with self.subTest(price=price):
                self.assertEqual(f"{price:.2f}", expected)`, notes: [{ at: "subTest", text: "reports each loop case on its own" }] }
          ]
        },
        {
          id: "test-tools", n: 4, title: "test tools", level: 3,
          gloss: "Controls the environment with override_settings, mail.outbox, RequestFactory and mock.",
          examples: [
            { code: `class FeatureTests(TestCase):
    @override_settings(DEBUG=True)
    def test_debug_on(self):
        self.assertTrue(settings.DEBUG)`, notes: [{ at: "override_settings", text: "restores the value afterwards" }] },
            { code: `class MailTests(TestCase):
    def test_welcome_mail(self):
        send_mail("Hi", "Body", "a@example.com", ["b@example.com"])
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, "Hi")`, notes: [{ at: "mail.outbox", text: "messages held in memory" }] },
            { code: `class ViewUnitTests(TestCase):
    def test_book_list_view(self):
        request = RequestFactory().get("/books/")
        response = book_list(request)
        self.assertEqual(response.status_code, 200)`, notes: [{ at: "RequestFactory", text: "calls a view without urls" }] },
            { code: `class SaveTests(TestCase):
    def test_save_is_called(self):
        with patch.object(Book, "save") as save:
            Book(title="x").save()
        save.assert_called_once()`, notes: [{ at: "patch.object", text: "swaps the method for a mock" }] }
          ]
        }
      ]
    }
  ]
};
