export default {
  id: "pytorch",
  name: "PyTorch",
  short: "PT",
  pigment: "pytorch",
  family: "python",
  version: "2.x",
  lexer: "python",
  indent: 4,
  topics: [
    {
      id: "tensors",
      n: 1,
      title: "tensors",
      concepts: [
        {
          id: "creating-tensors", n: 1, title: "creating tensors", level: 1,
          gloss: "Builds a tensor from Python data.",
          examples: [
            { code: `t = torch.tensor([[1, 2], [3, 4]])`, notes: [{ at: "[[1, 2], [3, 4]]", text: "nested lists make a 2-D tensor" }] },
            { code: `t = torch.tensor([1.5, 2.5, 3.5])
print(t.shape)`, notes: [{ at: ".shape", text: "a torch.Size, like a tuple" }] },
            { code: `t = torch.from_numpy(np.arange(6))`, notes: [{ at: "from_numpy", text: "shares memory with the array" }] }
          ]
        },
        {
          id: "filled-tensors", n: 2, title: "filled tensors", level: 1,
          gloss: "Creates tensors filled with constants, ranges or random values.",
          examples: [
            { code: `zeros = torch.zeros(2, 3)
ones = torch.ones(2, 3)`, notes: [{ at: "(2, 3)", text: "sizes can be separate arguments" }] },
            { code: `r = torch.rand(2, 3)
n = torch.randn(2, 3)`, notes: [{ at: "rand", text: "uniform in [0, 1)" }, { at: "randn", text: "standard normal" }] },
            { code: `a = torch.arange(10)
b = torch.linspace(0, 1, 5)
f = torch.full((2, 2), 7.0)`, notes: [] }
          ]
        },
        {
          id: "reshaping", n: 3, title: "reshaping", level: 1,
          gloss: "Changes a tensor's shape without changing its data.",
          examples: [
            { code: `t = torch.arange(6)
m = t.reshape(2, 3)`, notes: [{ at: "reshape", text: "same six values, new shape" }] },
            { code: `t = torch.arange(12).reshape(3, 4)
flat = t.view(-1)`, notes: [{ at: "-1", text: "inferred from the other sizes" }] },
            { code: `t = torch.zeros(2, 3)
u = t.unsqueeze(0)
v = u.squeeze(0)`, notes: [{ at: "unsqueeze(0)", text: "adds a size-1 dimension" }] }
          ]
        },
        {
          id: "tensor-indexing", n: 4, title: "indexing", level: 1,
          gloss: "Selects elements with indexes, slices and masks.",
          examples: [
            { code: `t = torch.arange(12).reshape(3, 4)
row = t[1]
col = t[:, 2]`, notes: [{ at: "t[:, 2]", text: "every row, column 2" }] },
            { code: `t = torch.arange(10)
evens = t[t % 2 == 0]`, notes: [{ at: "t % 2 == 0", text: "a boolean mask" }] },
            { code: `t = torch.arange(10)
last_three = t[-3:]
step = t[::2]`, notes: [] }
          ]
        },
        {
          id: "to-python", n: 5, title: "tensors to Python", level: 1,
          gloss: "Converts a tensor into plain Python or NumPy values.",
          examples: [
            { code: `t = torch.tensor(3.5)
value = t.item()`, notes: [{ at: "item()", text: "only for one-element tensors" }] },
            { code: `t = torch.tensor([1, 2, 3])
items = t.tolist()`, notes: [] },
            { code: `t = torch.arange(4)
arr = t.numpy()`, notes: [{ at: "numpy()", text: "shares memory on the CPU" }] }
          ]
        }
      ]
    },
    {
      id: "dtype-device",
      n: 2,
      title: "dtype & device",
      concepts: [
        {
          id: "dtypes", n: 1, title: "dtypes", level: 1,
          gloss: "Sets the numeric type of a tensor's elements.",
          examples: [
            { code: `t = torch.tensor([1, 2, 3], dtype=torch.float32)`, notes: [{ at: "dtype=", text: "set the element type" }] },
            { code: `t = torch.zeros(2, 2, dtype=torch.int64)
print(t.dtype)`, notes: [] },
            { code: `t = torch.tensor([1.9, 2.1])
i = t.to(torch.int32)`, notes: [{ at: "to(torch.int32)", text: "converts and truncates" }] }
          ]
        },
        {
          id: "dtype-defaults", n: 2, title: "default dtypes", level: 2,
          gloss: "Shows which types tensors get when you do not choose one.",
          examples: [
            { code: `ints = torch.tensor([1, 2, 3])
print(ints.dtype)`, notes: [{ at: "[1, 2, 3]", text: "whole numbers default to int64" }] },
            { code: `floats = torch.tensor([1.0, 2.0])
print(floats.dtype)`, notes: [{ at: "[1.0, 2.0]", text: "decimals default to float32" }] },
            { code: `x = torch.zeros(2)
y = x.double()
z = x.half()`, notes: [{ at: ".double()", text: "shortcut for float64" }] }
          ]
        },
        {
          id: "devices", n: 3, title: "devices", level: 2,
          gloss: "Moves tensors and models between CPU and GPU.",
          examples: [
            { code: `device = "cuda" if torch.cuda.is_available() else "cpu"
t = torch.zeros(2, 2, device=device)`, notes: [{ at: "device=device", text: "created directly on the device" }] },
            { code: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
t = torch.ones(3).to(device)`, notes: [{ at: ".to(device)", text: "returns a copy on that device" }] },
            { code: `device = "cuda" if torch.cuda.is_available() else "cpu"
net = nn.Linear(4, 2).to(device)
batch = torch.randn(8, 4, device=device)`, notes: [{ at: "net", text: "the model and its inputs must match" }] }
          ]
        },
        {
          id: "numpy-bridge", n: 4, title: "NumPy bridge", level: 2,
          gloss: "Converts between tensors and NumPy arrays.",
          examples: [
            { code: `a = np.ones(3)
t = torch.from_numpy(a)`, notes: [{ at: "from_numpy", text: "no copy is made" }] },
            { code: `t = torch.ones(3)
a = t.numpy()`, notes: [] },
            { code: `t = torch.randn(2, 2, requires_grad=True)
a = t.detach().numpy()`, notes: [{ at: ".detach()", text: "required when tracking gradients" }] }
          ]
        }
      ]
    },
    {
      id: "ops-broadcasting",
      n: 3,
      title: "ops & broadcasting",
      concepts: [
        {
          id: "elementwise-ops", n: 1, title: "elementwise operations", level: 1,
          gloss: "Applies arithmetic to every element at once.",
          examples: [
            { code: `a = torch.tensor([1.0, 2.0, 3.0])
b = a * 2 + 1`, notes: [{ at: "a * 2 + 1", text: "no loop needed" }] },
            { code: `a = torch.tensor([1.0, 4.0, 9.0])
r = torch.sqrt(a)
e = torch.exp(a)`, notes: [] },
            { code: `a = torch.tensor([1.0, 2.0])
b = torch.tensor([3.0, 4.0])
c = a * b`, notes: [{ at: "a * b", text: "element by element, not a matrix product" }] }
          ]
        },
        {
          id: "reductions", n: 2, title: "reductions", level: 1,
          gloss: "Collapses a tensor to a smaller one with sum, mean and max.",
          examples: [
            { code: `t = torch.arange(6.0).reshape(2, 3)
total = t.sum()
mean = t.mean()`, notes: [{ at: "mean()", text: "needs a floating dtype" }] },
            { code: `t = torch.arange(6.0).reshape(2, 3)
cols = t.sum(dim=0)
rows = t.sum(dim=1)`, notes: [{ at: "dim=0", text: "collapses the rows" }] },
            { code: `t = torch.tensor([3.0, 9.0, 1.0])
m = t.max()
idx = t.argmax()`, notes: [{ at: "argmax", text: "position of the largest value" }] }
          ]
        },
        {
          id: "broadcasting", n: 3, title: "broadcasting", level: 2,
          gloss: "Stretches smaller shapes to match larger ones automatically.",
          examples: [
            { code: `a = torch.ones(3, 4)
b = torch.tensor([1.0, 2.0, 3.0, 4.0])
c = a * b`, notes: [{ at: "a * b", text: "b is repeated for every row" }] },
            { code: `col = torch.tensor([[1.0], [2.0], [3.0]])
row = torch.tensor([10.0, 20.0])
grid = col + row`, notes: [{ at: "col + row", text: "the result has shape (3, 2)" }] },
            { code: `x = torch.randn(8, 3)
mean = x.mean(dim=0, keepdim=True)
centered = x - mean`, notes: [{ at: "keepdim=True", text: "keeps shape (1, 3) for broadcasting" }] }
          ]
        },
        {
          id: "matmul", n: 4, title: "matrix multiplication", level: 2,
          gloss: "Multiplies matrices with the @ operator and torch.matmul.",
          examples: [
            { code: `a = torch.randn(2, 3)
b = torch.randn(3, 4)
c = a @ b`, notes: [{ at: "@", text: "matrix product, shape (2, 4)" }] },
            { code: `x = torch.randn(5, 3)
w = torch.randn(3)
y = x @ w`, notes: [{ at: "x @ w", text: "matrix times vector" }] },
            { code: `a = torch.randn(10, 2, 3)
b = torch.randn(10, 3, 4)
c = torch.bmm(a, b)`, notes: [{ at: "bmm", text: "one product per batch item" }] }
          ]
        },
        {
          id: "cat-stack", n: 5, title: "joining and splitting", level: 2,
          gloss: "Joins or splits tensors along a dimension.",
          examples: [
            { code: `a = torch.zeros(2, 3)
b = torch.ones(2, 3)
c = torch.cat([a, b], dim=0)`, notes: [{ at: "cat", text: "joins along an existing dimension" }] },
            { code: `a = torch.zeros(2, 3)
b = torch.ones(2, 3)
c = torch.stack([a, b])`, notes: [{ at: "stack", text: "adds a new leading dimension" }] },
            { code: `parts = torch.chunk(torch.arange(6), 3)
first = parts[0]`, notes: [{ at: "chunk", text: "three pieces of two" }] }
          ]
        },
        {
          id: "transposing", n: 6, title: "transposing", level: 2,
          gloss: "Swaps or reorders the dimensions of a tensor.",
          examples: [
            { code: `x = torch.randn(2, 3)
t = x.T`, notes: [{ at: "x.T", text: "shape (3, 2)" }] },
            { code: `x = torch.randn(2, 3, 4)
y = x.permute(2, 0, 1)`, notes: [{ at: "permute", text: "the new order of dimensions" }] },
            { code: `x = torch.randn(2, 3)
y = x.transpose(0, 1)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "autograd",
      n: 4,
      title: "autograd",
      concepts: [
        {
          id: "requires-grad", n: 1, title: "requires_grad", level: 2,
          gloss: "Tracks operations on a tensor so gradients can be computed.",
          examples: [
            { code: `x = torch.tensor(3.0, requires_grad=True)`, notes: [{ at: "requires_grad=True", text: "records every operation on x" }] },
            { code: `w = torch.randn(3, requires_grad=True)
print(w.requires_grad)`, notes: [] },
            { code: `x = torch.ones(2)
x.requires_grad_(True)`, notes: [{ at: "requires_grad_", text: "the trailing underscore edits in place" }] }
          ]
        },
        {
          id: "backward", n: 2, title: "backward", level: 2,
          gloss: "Computes gradients of a scalar with backward.",
          examples: [
            { code: `x = torch.tensor(3.0, requires_grad=True)
y = x ** 2
y.backward()
print(x.grad)`, notes: [{ at: "x.grad", text: "dy/dx = 2x = 6" }] },
            { code: `w = torch.tensor([1.0, 2.0], requires_grad=True)
loss = (w * w).sum()
loss.backward()`, notes: [{ at: ".sum()", text: "backward needs a scalar" }] },
            { code: `x = torch.tensor(2.0, requires_grad=True)
y = x * x * x
y.backward()
print(x.grad)`, notes: [] }
          ]
        },
        {
          id: "grad-accumulation", n: 3, title: "gradient accumulation", level: 3,
          gloss: "Clears gradients first because backward adds to them.",
          examples: [
            { code: `x = torch.tensor(1.0, requires_grad=True)
(x * 2).backward()
(x * 2).backward()
print(x.grad)`, notes: [{ at: "x.grad", text: "gradients add up to 4" }] },
            { code: `optimizer.zero_grad()
loss = F.mse_loss(model(x), torch.zeros(32, 3))
loss.backward()`, notes: [{ at: "zero_grad()", text: "clear the old gradients first" }] },
            { code: `x = torch.tensor(1.0, requires_grad=True)
(x * 2).backward()
x.grad.zero_()`, notes: [{ at: ".zero_()", text: "reset in place" }] }
          ]
        },
        {
          id: "detach-nograd", n: 4, title: "detach and no_grad", level: 2,
          gloss: "Stops gradient tracking for part of a computation.",
          examples: [
            { code: `x = torch.ones(3, requires_grad=True)
y = x.detach()`, notes: [{ at: "detach()", text: "same data, no history" }] },
            { code: `x = torch.ones(3, requires_grad=True)
with torch.no_grad():
    y = x * 2`, notes: [{ at: "no_grad()", text: "no graph is recorded inside" }] },
            { code: `x = torch.ones(3, requires_grad=True)
with torch.no_grad():
    x -= 0.1`, notes: [{ at: "x -= 0.1", text: "a manual update, untracked" }] }
          ]
        },
        {
          id: "autograd-grad", n: 5, title: "torch.autograd.grad", level: 3,
          gloss: "Returns gradients directly instead of storing them in .grad.",
          examples: [
            { code: `x = torch.tensor(2.0, requires_grad=True)
y = x ** 3
(g,) = torch.autograd.grad(y, x)`, notes: [{ at: "(g,)", text: "the result is a tuple" }] },
            { code: `a = torch.tensor(1.0, requires_grad=True)
b = torch.tensor(2.0, requires_grad=True)
z = a * b
ga, gb = torch.autograd.grad(z, (a, b))`, notes: [{ at: "(a, b)", text: "one gradient per input" }] },
            { code: `x = torch.tensor(2.0, requires_grad=True)
y = x ** 3
(g,) = torch.autograd.grad(y, x, create_graph=True)
(g2,) = torch.autograd.grad(g, x)`, notes: [{ at: "create_graph=True", text: "allows a second derivative" }] }
          ]
        }
      ]
    },
    {
      id: "nn-module",
      n: 5,
      title: "nn.Module",
      concepts: [
        {
          id: "module-definition", n: 1, title: "defining a module", level: 1,
          gloss: "Defines a model as a class that subclasses nn.Module.",
          examples: [
            { code: `class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(4, 2)

    def forward(self, x):
        return self.fc(x)`, notes: [{ at: "super().__init__()", text: "required before adding layers" }, { at: "forward", text: "describes the computation" }] },
            { code: `class TwoLayer(nn.Module):
    def __init__(self, hidden):
        super().__init__()
        self.fc1 = nn.Linear(4, hidden)
        self.fc2 = nn.Linear(hidden, 1)

    def forward(self, x):
        return self.fc2(F.relu(self.fc1(x)))`, notes: [{ at: "F.relu", text: "functional form, no parameters" }] },
            { code: `class Scale(nn.Module):
    def __init__(self):
        super().__init__()
        self.alpha = nn.Parameter(torch.ones(1))

    def forward(self, x):
        return self.alpha * x`, notes: [{ at: "nn.Parameter", text: "a tensor the optimizer will train" }] }
          ]
        },
        {
          id: "module-call", n: 2, title: "calling a module", level: 1,
          gloss: "Runs a model by calling it like a function.",
          examples: [
            { code: `net = nn.Linear(4, 2)
out = net(torch.randn(8, 4))`, notes: [{ at: "net(torch", text: "calls forward for you" }] },
            { code: `out = model(x)
print(out.shape)`, notes: [] },
            { code: `net = nn.Linear(4, 2)
batch = torch.randn(8, 4)
logits = net(batch)
probs = logits.softmax(dim=1)`, notes: [{ at: "softmax(dim=1)", text: "turns scores into probabilities" }] }
          ]
        },
        {
          id: "parameters", n: 3, title: "parameters", level: 2,
          gloss: "Lists and counts the trainable parameters of a module.",
          examples: [
            { code: `for name, p in model.named_parameters():
    print(name, p.shape)`, notes: [{ at: "named_parameters", text: "names with tensors" }] },
            { code: `n = sum(p.numel() for p in model.parameters())`, notes: [{ at: "numel()", text: "number of elements" }] },
            { code: `for p in model[0].parameters():
    p.requires_grad = False`, notes: [{ at: "requires_grad = False", text: "freezes this layer" }] }
          ]
        },
        {
          id: "sequential", n: 4, title: "Sequential", level: 1,
          gloss: "Chains layers in order with nn.Sequential.",
          examples: [
            { code: `net = nn.Sequential(
    nn.Linear(4, 8),
    nn.ReLU(),
    nn.Linear(8, 2),
)`, notes: [{ at: "nn.ReLU()", text: "layers run top to bottom" }] },
            { code: `block = nn.Sequential(nn.Linear(8, 8), nn.ReLU())
net = nn.Sequential(block, nn.Linear(8, 1))`, notes: [{ at: "block", text: "a Sequential can nest" }] },
            { code: `net = nn.Sequential()
net.add_module("fc", nn.Linear(4, 2))`, notes: [{ at: "add_module", text: "adds a named layer" }] }
          ]
        },
        {
          id: "module-containers", n: 5, title: "ModuleList and buffers", level: 3,
          gloss: "Registers submodules and fixed tensors so the module tracks them.",
          examples: [
            { code: `class Stack(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.ModuleList(nn.Linear(4, 4) for _ in range(3))

    def forward(self, x):
        for layer in self.layers:
            x = layer(x)
        return x`, notes: [{ at: "ModuleList", text: "a plain list would hide the layers" }] },
            { code: `class Heads(nn.Module):
    def __init__(self):
        super().__init__()
        self.heads = nn.ModuleDict({
            "a": nn.Linear(4, 1),
            "b": nn.Linear(4, 2),
        })`, notes: [{ at: "ModuleDict", text: "submodules looked up by name" }] },
            { code: `class RunningMean(nn.Module):
    def __init__(self):
        super().__init__()
        self.register_buffer("mean", torch.zeros(4))`, notes: [{ at: "register_buffer", text: "saved in state_dict, not trained" }] }
          ]
        }
      ]
    },
    {
      id: "layers",
      n: 6,
      title: "layers",
      concepts: [
        {
          id: "linear", n: 1, title: "Linear", level: 1,
          gloss: "Applies a learned affine transform to the last dimension.",
          examples: [
            { code: `fc = nn.Linear(4, 2)`, notes: [{ at: "(4, 2)", text: "in_features, out_features" }] },
            { code: `fc = nn.Linear(10, 5, bias=False)`, notes: [{ at: "bias=False", text: "drops the additive term" }] },
            { code: `fc = nn.Linear(4, 2)
print(fc.weight.shape)`, notes: [{ at: "weight.shape", text: "(out, in), here (2, 4)" }] }
          ]
        },
        {
          id: "conv", n: 2, title: "Conv2d", level: 2,
          gloss: "Slides learned filters over images with Conv2d.",
          examples: [
            { code: `conv = nn.Conv2d(3, 16, kernel_size=3)`, notes: [{ at: "3, 16", text: "3 input channels, 16 filters" }] },
            { code: `conv = nn.Conv2d(1, 8, kernel_size=5, padding=2, stride=1)`, notes: [{ at: "padding=2", text: "keeps height and width" }] },
            { code: `x = torch.randn(4, 3, 32, 32)
out = nn.Conv2d(3, 16, 3)(x)`, notes: [{ at: "(4, 3, 32, 32)", text: "batch, channels, height, width" }] }
          ]
        },
        {
          id: "pooling", n: 3, title: "pooling", level: 2,
          gloss: "Downsamples feature maps by pooling neighbouring values.",
          examples: [
            { code: `pool = nn.MaxPool2d(2)`, notes: [{ at: "2", text: "halves height and width" }] },
            { code: `pool = nn.AdaptiveAvgPool2d(1)`, notes: [{ at: "1", text: "a 1x1 output for any input size" }] },
            { code: `x = torch.randn(4, 16, 8, 8)
out = nn.AvgPool2d(2)(x)`, notes: [] }
          ]
        },
        {
          id: "norm-dropout", n: 4, title: "normalization and dropout", level: 2,
          gloss: "Stabilizes and regularizes training with norm and dropout layers.",
          examples: [
            { code: `bn = nn.BatchNorm1d(16)`, notes: [{ at: "16", text: "the number of features" }] },
            { code: `drop = nn.Dropout(p=0.5)`, notes: [{ at: "p=0.5", text: "zeroes half the values in training" }] },
            { code: `ln = nn.LayerNorm(64)`, notes: [] }
          ]
        },
        {
          id: "embedding-rnn", n: 5, title: "Embedding and LSTM", level: 3,
          gloss: "Maps token ids to vectors and models sequences.",
          examples: [
            { code: `emb = nn.Embedding(1000, 32)`, notes: [{ at: "(1000, 32)", text: "vocabulary size, vector size" }] },
            { code: `ids = torch.tensor([[1, 5, 7]])
vecs = nn.Embedding(1000, 32)(ids)`, notes: [{ at: "ids", text: "integer token ids, shape (1, 3)" }] },
            { code: `lstm = nn.LSTM(input_size=32, hidden_size=64, batch_first=True)`, notes: [{ at: "batch_first=True", text: "input is (batch, time, features)" }] }
          ]
        }
      ]
    },
    {
      id: "activations-losses",
      n: 7,
      title: "activations & losses",
      concepts: [
        {
          id: "activations", n: 1, title: "activations", level: 1,
          gloss: "Adds nonlinearity between layers.",
          examples: [
            { code: `act = nn.ReLU()`, notes: [{ at: "ReLU", text: "zeroes negative values" }] },
            { code: `y = torch.sigmoid(torch.tensor([-1.0, 0.0, 1.0]))`, notes: [{ at: "sigmoid", text: "squashes values into (0, 1)" }] },
            { code: `probs = F.softmax(torch.tensor([1.0, 2.0, 3.0]), dim=0)`, notes: [{ at: "dim=0", text: "the probabilities sum to 1" }] }
          ]
        },
        {
          id: "classification-losses", n: 2, title: "classification losses", level: 1,
          gloss: "Measures classification error with cross-entropy.",
          examples: [
            { code: `loss_fn = nn.CrossEntropyLoss()
loss = loss_fn(model(x), y)`, notes: [{ at: "CrossEntropyLoss", text: "takes raw logits, not probabilities" }] },
            { code: `logits = torch.randn(4, 3)
target = torch.tensor([0, 2, 1, 1])
loss = F.cross_entropy(logits, target)`, notes: [{ at: "target", text: "class indexes as long integers" }] },
            { code: `logit = torch.randn(8)
label = torch.randint(0, 2, (8,)).float()
loss = F.binary_cross_entropy_with_logits(logit, label)`, notes: [{ at: "with_logits", text: "the sigmoid is built in" }] }
          ]
        },
        {
          id: "regression-losses", n: 3, title: "regression losses", level: 1,
          gloss: "Measures regression error with MSE and L1 losses.",
          examples: [
            { code: `loss = F.mse_loss(torch.randn(8), torch.randn(8))`, notes: [{ at: "mse_loss", text: "mean of squared differences" }] },
            { code: `loss_fn = nn.L1Loss()
loss = loss_fn(model(x), torch.zeros(32, 3))`, notes: [{ at: "L1Loss", text: "mean absolute difference" }] },
            { code: `loss = F.smooth_l1_loss(torch.randn(8), torch.randn(8))`, notes: [{ at: "smooth_l1_loss", text: "quadratic near zero, linear far out" }] }
          ]
        },
        {
          id: "loss-options", n: 4, title: "loss options", level: 3,
          gloss: "Tunes a loss with reduction, class weights and label smoothing.",
          examples: [
            { code: `loss_fn = nn.CrossEntropyLoss(reduction="sum")`, notes: [{ at: "reduction=\"sum\"", text: "add instead of average" }] },
            { code: `weights = torch.tensor([1.0, 2.0, 1.0])
loss_fn = nn.CrossEntropyLoss(weight=weights)`, notes: [{ at: "weight=", text: "one factor per class" }] },
            { code: `loss_fn = nn.CrossEntropyLoss(label_smoothing=0.1)`, notes: [{ at: "label_smoothing", text: "softens the one-hot targets" }] }
          ]
        }
      ]
    },
    {
      id: "optimizers",
      n: 8,
      title: "optimizers",
      concepts: [
        {
          id: "sgd", n: 1, title: "SGD", level: 1,
          gloss: "Updates parameters with stochastic gradient descent.",
          examples: [
            { code: `optimizer = optim.SGD(model.parameters(), lr=0.01)`, notes: [{ at: "model.parameters()", text: "what the optimizer updates" }] },
            { code: `optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)`, notes: [{ at: "momentum", text: "smooths updates across steps" }] },
            { code: `optimizer = optim.SGD(model.parameters(), lr=0.1, weight_decay=1e-4)`, notes: [{ at: "weight_decay", text: "an L2 penalty" }] }
          ]
        },
        {
          id: "adam", n: 2, title: "Adam", level: 1,
          gloss: "Adapts learning rates per parameter with Adam.",
          examples: [
            { code: `optimizer = optim.Adam(model.parameters(), lr=1e-3)`, notes: [{ at: "lr=1e-3", text: "a common starting rate" }] },
            { code: `optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)`, notes: [{ at: "AdamW", text: "decoupled weight decay" }] },
            { code: `optimizer = optim.Adam(model.parameters(), lr=3e-4, betas=(0.9, 0.999))`, notes: [] }
          ]
        },
        {
          id: "optimizer-step", n: 3, title: "one optimizer step", level: 1,
          gloss: "Applies one update: clear gradients, backpropagate, step.",
          examples: [
            { code: `loss = loss_fn(model(x), y)
optimizer.zero_grad()
loss.backward()
optimizer.step()`, notes: [{ at: "step()", text: "applies the gradients" }] },
            { code: `loss = loss_fn(model(x), y)
optimizer.zero_grad(set_to_none=True)
loss.backward()
optimizer.step()`, notes: [{ at: "set_to_none=True", text: "frees gradients instead of zeroing" }] },
            { code: `loss = loss_fn(model(x), y)
optimizer.zero_grad()
loss.backward()
nn.utils.clip_grad_norm_(model.parameters(), 1.0)
optimizer.step()`, notes: [{ at: "clip_grad_norm_", text: "caps the gradient norm" }] }
          ]
        },
        {
          id: "lr-schedulers", n: 4, title: "learning-rate schedulers", level: 2,
          gloss: "Changes the learning rate over time with a scheduler.",
          examples: [
            { code: `scheduler = optim.lr_scheduler.StepLR(
    optimizer, step_size=10, gamma=0.1
)`, notes: [{ at: "gamma=0.1", text: "multiply the rate by 0.1" }] },
            { code: `scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=50)`, notes: [{ at: "T_max", text: "steps in one cosine cycle" }] },
            { code: `scheduler = optim.lr_scheduler.ExponentialLR(optimizer, gamma=0.9)
for epoch in range(3):
    optimizer.step()
    scheduler.step()`, notes: [{ at: "scheduler.step()", text: "once per epoch, after the optimizer" }] }
          ]
        }
      ]
    },
    {
      id: "training-loop",
      n: 9,
      title: "the training loop",
      concepts: [
        {
          id: "train-step", n: 1, title: "a training step", level: 1,
          gloss: "Runs one batch through forward, loss, backward and step.",
          examples: [
            { code: `pred = model(x)
loss = loss_fn(pred, y)
optimizer.zero_grad()
loss.backward()
optimizer.step()`, notes: [{ at: "pred", text: "the forward pass" }] },
            { code: `for xb, yb in loader:
    optimizer.zero_grad()
    loss = loss_fn(model(xb), yb)
    loss.backward()
    optimizer.step()`, notes: [{ at: "for xb, yb", text: "one mini-batch per iteration" }] },
            { code: `model.train()
loss = loss_fn(model(x), y)
loss.backward()
optimizer.step()`, notes: [{ at: "model.train()", text: "dropout and batch norm active" }] }
          ]
        },
        {
          id: "epoch-loop", n: 2, title: "the epoch loop", level: 1,
          gloss: "Repeats training over the whole dataset for several epochs.",
          examples: [
            { code: `for epoch in range(5):
    for xb, yb in loader:
        optimizer.zero_grad()
        loss_fn(model(xb), yb).backward()
        optimizer.step()`, notes: [{ at: "range(5)", text: "five full passes" }] },
            { code: `total = 0.0
for xb, yb in loader:
    optimizer.zero_grad()
    loss = loss_fn(model(xb), yb)
    loss.backward()
    optimizer.step()
    total += loss.item()
print(total / len(loader))`, notes: [{ at: "loss.item()", text: "a Python float, no graph kept" }] },
            { code: `for epoch in range(3):
    for xb, yb in loader:
        optimizer.zero_grad()
        loss_fn(model(xb), yb).backward()
        optimizer.step()
    print(f"epoch {epoch} done")`, notes: [] }
          ]
        },
        {
          id: "device-loop", n: 3, title: "batches on a device", level: 2,
          gloss: "Moves each batch to the training device before the forward pass.",
          examples: [
            { code: `device = "cuda" if torch.cuda.is_available() else "cpu"
model = model.to(device)
for xb, yb in loader:
    xb, yb = xb.to(device), yb.to(device)`, notes: [{ at: "model.to(device)", text: "done once, before the loop" }] },
            { code: `device = "cuda" if torch.cuda.is_available() else "cpu"
for xb, yb in loader:
    xb = xb.to(device, non_blocking=True)`, notes: [{ at: "non_blocking=True", text: "overlaps the copy with compute" }] },
            { code: `device = "cuda" if torch.cuda.is_available() else "cpu"
batch = next(iter(loader))
xb, yb = (t.to(device) for t in batch)`, notes: [{ at: "next(iter(loader))", text: "one batch for a quick check" }] }
          ]
        },
        {
          id: "accuracy-tracking", n: 4, title: "tracking accuracy", level: 2,
          gloss: "Counts correct predictions while training or evaluating.",
          examples: [
            { code: `pred = model(x).argmax(dim=1)
correct = (pred == y).sum().item()`, notes: [{ at: "argmax(dim=1)", text: "the predicted class" }] },
            { code: `acc = (model(x).argmax(1) == y).float().mean().item()`, notes: [{ at: ".float().mean()", text: "fraction of matches" }] },
            { code: `total = correct = 0
for xb, yb in loader:
    pred = model(xb).argmax(dim=1)
    correct += (pred == yb).sum().item()
    total += yb.size(0)`, notes: [{ at: "yb.size(0)", text: "the batch length" }] }
          ]
        },
        {
          id: "gradient-accumulation-loop", n: 5, title: "accumulating steps", level: 3,
          gloss: "Simulates a larger batch by stepping every few mini-batches.",
          examples: [
            { code: `for i, (xb, yb) in enumerate(loader):
    loss = loss_fn(model(xb), yb) / 4
    loss.backward()
    if (i + 1) % 4 == 0:
        optimizer.step()
        optimizer.zero_grad()`, notes: [{ at: "/ 4", text: "averages over the accumulated batches" }] },
            { code: `accum = 2
for i, (xb, yb) in enumerate(loader):
    (loss_fn(model(xb), yb) / accum).backward()
    if (i + 1) % accum == 0:
        optimizer.step()
        optimizer.zero_grad()`, notes: [] },
            { code: `accum = 4
for i, (xb, yb) in enumerate(loader):
    (loss_fn(model(xb), yb) / accum).backward()
    if (i + 1) % accum == 0:
        nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        optimizer.zero_grad()`, notes: [] }
          ]
        },
        {
          id: "mixed-precision", n: 6, title: "mixed precision", level: 3,
          gloss: "Runs the forward pass in lower precision with autocast.",
          examples: [
            { code: `with torch.autocast(device_type="cpu", dtype=torch.bfloat16):
    out = model(x)
print(out.dtype)`, notes: [{ at: "autocast", text: "picks a lower precision per operation" }] },
            { code: `x16 = x.to(torch.bfloat16)
m16 = nn.Linear(4, 2).to(torch.bfloat16)
out = m16(x16)`, notes: [{ at: "bfloat16", text: "float32's range, fewer digits" }] },
            { code: `with torch.autocast("cpu", dtype=torch.bfloat16):
    loss = loss_fn(model(x), y)
loss.backward()`, notes: [{ at: "loss.backward()", text: "stays outside the autocast block" }] }
          ]
        }
      ]
    },
    {
      id: "dataset-dataloader",
      n: 10,
      title: "Dataset & DataLoader",
      concepts: [
        {
          id: "tensor-dataset", n: 1, title: "TensorDataset", level: 1,
          gloss: "Pairs inputs with labels in a TensorDataset.",
          examples: [
            { code: `ds = TensorDataset(x, y)
print(len(ds))`, notes: [{ at: "TensorDataset(x, y)", text: "indexes rows together" }] },
            { code: `ds = TensorDataset(torch.randn(100, 4), torch.randint(0, 2, (100,)))
xi, yi = ds[0]`, notes: [{ at: "ds[0]", text: "one (input, label) pair" }] },
            { code: `features = torch.randn(50, 3)
labels = torch.randn(50)
ds = TensorDataset(features, labels)`, notes: [] }
          ]
        },
        {
          id: "custom-dataset", n: 2, title: "custom Dataset", level: 2,
          gloss: "Defines a custom Dataset with __len__ and __getitem__.",
          examples: [
            { code: `class Squares(Dataset):
    def __len__(self):
        return 10

    def __getitem__(self, i):
        return torch.tensor(float(i)), torch.tensor(float(i * i))`, notes: [{ at: "__getitem__", text: "returns one sample" }] },
            { code: `class Pairs(Dataset):
    def __init__(self, xs, ys):
        self.xs, self.ys = xs, ys
    def __len__(self):
        return len(self.xs)
    def __getitem__(self, i):
        return self.xs[i], self.ys[i]`, notes: [{ at: "__len__", text: "the number of samples" }] },
            { code: `class Noisy(Dataset):
    def __init__(self, base, scale=0.1):
        self.base, self.scale = base, scale
    def __len__(self):
        return len(self.base)
    def __getitem__(self, i):
        x, y = self.base[i]
        return x + self.scale * torch.randn_like(x), y`, notes: [{ at: "randn_like", text: "noise with the same shape as x" }] }
          ]
        },
        {
          id: "dataloader", n: 3, title: "DataLoader", level: 1,
          gloss: "Batches and shuffles a dataset with DataLoader.",
          examples: [
            { code: `loader = DataLoader(dataset, batch_size=16, shuffle=True)`, notes: [{ at: "shuffle=True", text: "a new order every epoch" }] },
            { code: `for xb, yb in loader:
    print(xb.shape, yb.shape)`, notes: [{ at: "xb.shape", text: "a leading batch dimension" }] },
            { code: `loader = DataLoader(dataset, batch_size=8, drop_last=True)
print(len(loader))`, notes: [{ at: "drop_last", text: "skips a short final batch" }] }
          ]
        },
        {
          id: "loader-options", n: 4, title: "loader options", level: 2,
          gloss: "Tunes loading with workers, collate functions and seeds.",
          examples: [
            { code: `loader = DataLoader(dataset, batch_size=32, num_workers=2)`, notes: [{ at: "num_workers", text: "loads batches in parallel processes" }] },
            { code: `def collate(batch):
    xs, ys = zip(*batch)
    return torch.stack(xs), torch.stack(ys)

loader = DataLoader(dataset, batch_size=8, collate_fn=collate)`, notes: [{ at: "collate_fn", text: "controls how samples become a batch" }] },
            { code: `g = torch.Generator().manual_seed(0)
loader = DataLoader(dataset, batch_size=8, shuffle=True, generator=g)`, notes: [{ at: "generator=g", text: "makes shuffling repeatable" }] }
          ]
        },
        {
          id: "splitting-datasets", n: 5, title: "splitting datasets", level: 2,
          gloss: "Splits a dataset into training and validation parts.",
          examples: [
            { code: `train_ds, val_ds = random_split(dataset, [24, 8])`, notes: [{ at: "[24, 8]", text: "lengths that sum to the total" }] },
            { code: `n = len(dataset)
n_train = int(0.8 * n)
train_ds, val_ds = random_split(dataset, [n_train, n - n_train])`, notes: [] },
            { code: `train_ds, val_ds = random_split(dataset, [0.75, 0.25])`, notes: [{ at: "[0.75, 0.25]", text: "fractions are allowed" }] }
          ]
        }
      ]
    },
    {
      id: "eval-inference",
      n: 11,
      title: "eval, no_grad, inference_mode",
      concepts: [
        {
          id: "eval-mode", n: 1, title: "eval mode", level: 1,
          gloss: "Switches layers such as dropout to their inference behavior.",
          examples: [
            { code: `model.eval()`, notes: [{ at: "eval()", text: "dropout off, batch norm frozen" }] },
            { code: `model.train()
model.eval()
print(model.training)`, notes: [{ at: "model.training", text: "false in eval mode" }] },
            { code: `net = nn.Sequential(nn.Linear(4, 4), nn.Dropout(0.5))
net.eval()
out = net(torch.randn(2, 4))`, notes: [{ at: "Dropout", text: "does nothing in eval mode" }] }
          ]
        },
        {
          id: "no-grad", n: 2, title: "no_grad", level: 1,
          gloss: "Skips gradient tracking to save memory during evaluation.",
          examples: [
            { code: `with torch.no_grad():
    out = model(x)`, notes: [{ at: "no_grad()", text: "no graph is built" }] },
            { code: `model.eval()
with torch.no_grad():
    pred = model(x).argmax(dim=1)`, notes: [{ at: "model.eval()", text: "separate from no_grad" }] },
            { code: `@torch.no_grad()
def predict(batch):
    return model(batch).argmax(dim=1)`, notes: [{ at: "@torch.no_grad()", text: "works as a decorator too" }] }
          ]
        },
        {
          id: "inference-mode", n: 3, title: "inference_mode", level: 2,
          gloss: "Disables autograd more aggressively than no_grad for pure inference.",
          examples: [
            { code: `with torch.inference_mode():
    out = model(x)`, notes: [{ at: "inference_mode()", text: "faster than no_grad" }] },
            { code: `@torch.inference_mode()
def predict(batch):
    return model(batch)`, notes: [] },
            { code: `model.eval()
with torch.inference_mode():
    for xb, yb in loader:
        out = model(xb)`, notes: [{ at: "out", text: "cannot be used in autograd later" }] }
          ]
        },
        {
          id: "evaluation-loop", n: 4, title: "the evaluation loop", level: 2,
          gloss: "Measures validation loss and accuracy over a loader.",
          examples: [
            { code: `model.eval()
total = 0.0
with torch.no_grad():
    for xb, yb in loader:
        total += loss_fn(model(xb), yb).item()
print(total / len(loader))`, notes: [{ at: "total / len(loader)", text: "mean loss per batch" }] },
            { code: `correct = 0
with torch.inference_mode():
    for xb, yb in loader:
        correct += (model(xb).argmax(1) == yb).sum().item()
print(correct / len(loader.dataset))`, notes: [{ at: "loader.dataset", text: "the full sample count" }] },
            { code: `with torch.no_grad():
    preds = torch.cat([model(xb).argmax(1) for xb, _ in loader])`, notes: [{ at: "torch.cat", text: "joins the per-batch predictions" }] }
          ]
        }
      ]
    },
    {
      id: "state-dict",
      n: 12,
      title: "state_dict save & load",
      concepts: [
        {
          id: "state-dict-basics", n: 1, title: "state_dict", level: 1,
          gloss: "Reads a model's learned tensors as a dictionary.",
          examples: [
            { code: `sd = model.state_dict()
print(list(sd.keys()))`, notes: [{ at: "state_dict()", text: "parameter names to tensors" }] },
            { code: `for k, v in model.state_dict().items():
    print(k, v.shape)`, notes: [] },
            { code: `sd = nn.Linear(4, 2).state_dict()
print(sd["weight"].shape)`, notes: [] }
          ]
        },
        {
          id: "save-load", n: 2, title: "saving and loading", level: 1,
          gloss: "Saves and restores weights with torch.save and load_state_dict.",
          examples: [
            { code: `torch.save(model.state_dict(), "weights.pt")`, notes: [{ at: "state_dict()", text: "save weights, not the class" }] },
            { code: `model.load_state_dict(torch.load("model.pt", weights_only=True))`, notes: [{ at: "weights_only=True", text: "refuses to unpickle code" }] },
            { code: `state = torch.load("model.pt", map_location="cpu", weights_only=True)
model.load_state_dict(state)`, notes: [{ at: "map_location", text: "loads a GPU file on the CPU" }] }
          ]
        },
        {
          id: "checkpoints", n: 3, title: "checkpoints", level: 2,
          gloss: "Stores the optimizer and epoch alongside the weights.",
          examples: [
            { code: `ckpt = {
    "model": model.state_dict(),
    "optimizer": optimizer.state_dict(),
    "epoch": 3,
}
torch.save(ckpt, "ckpt.pt")`, notes: [{ at: "optimizer.state_dict()", text: "needed to resume training" }] },
            { code: `ckpt = torch.load("ckpt.pt", weights_only=True)
model.load_state_dict(ckpt["model"])
optimizer.load_state_dict(ckpt["optimizer"])`, notes: [] },
            { code: `ckpt = torch.load("ckpt.pt", weights_only=True)
for epoch in range(ckpt["epoch"] + 1, 5):
    print("resume at", epoch)`, notes: [{ at: "ckpt[\"epoch\"] + 1", text: "continue after the saved epoch" }] }
          ]
        },
        {
          id: "partial-load", n: 4, title: "partial loading", level: 3,
          gloss: "Loads only the matching weights with strict=False.",
          examples: [
            { code: `state = torch.load("model.pt", weights_only=True)
result = model.load_state_dict(state, strict=False)
print(result.missing_keys)`, notes: [{ at: "strict=False", text: "reports mismatches instead of raising" }] },
            { code: `state = torch.load("model.pt", weights_only=True)
body = {k: v for k, v in state.items() if k.startswith("0.")}
model.load_state_dict(body, strict=False)`, notes: [{ at: "startswith(\"0.\")", text: "only the first layer's keys" }] },
            { code: `new = nn.Sequential(nn.Linear(4, 8), nn.ReLU(), nn.Linear(8, 5))
state = model.state_dict()
head = {k: v for k, v in state.items() if k.startswith("0.")}
new.load_state_dict(head, strict=False)`, notes: [{ at: "Linear(8, 5)", text: "a new head, left untouched" }] }
          ]
        }
      ]
    },
    {
      id: "torch-compile",
      n: 13,
      title: "torch.compile",
      concepts: [
        {
          id: "compile-model", n: 1, title: "compiling a model", level: 2,
          gloss: "Compiles a model into faster code with torch.compile.",
          examples: [
            { code: `compiled = torch.compile(model)
out = compiled(x)`, notes: [{ at: "torch.compile(model)", text: "returns a wrapped model" }] },
            { code: `net = torch.compile(nn.Linear(4, 2))`, notes: [] },
            { code: `compiled = torch.compile(model, fullgraph=True)`, notes: [{ at: "fullgraph=True", text: "errors instead of falling back" }] }
          ]
        },
        {
          id: "compile-function", n: 2, title: "compiling a function", level: 2,
          gloss: "Compiles a plain function with the decorator or call form.",
          examples: [
            { code: `@torch.compile
def gelu(x):
    return x * 0.5 * (1 + torch.erf(x / 1.41421356))`, notes: [{ at: "@torch.compile", text: "compiled on the first call" }] },
            { code: `@torch.compile
def norm(x):
    return (x - x.mean()) / x.std()`, notes: [] },
            { code: `def f(x):
    return torch.sin(x) ** 2

fast = torch.compile(f)`, notes: [{ at: "fast", text: "same behavior, compiled" }] }
          ]
        },
        {
          id: "compile-options", n: 3, title: "compile options", level: 3,
          gloss: "Tunes compilation with mode, dynamic shapes and backend.",
          examples: [
            { code: `compiled = torch.compile(model, mode="max-autotune")`, notes: [{ at: "max-autotune", text: "longer compile, faster code" }] },
            { code: `compiled = torch.compile(model, dynamic=True)`, notes: [{ at: "dynamic=True", text: "avoids recompiling for new shapes" }] },
            { code: `compiled = torch.compile(model, backend="eager")`, notes: [{ at: "backend=\"eager\"", text: "debugging, skips code generation" }] }
          ]
        },
        {
          id: "compile-warmup", n: 4, title: "warmup and reuse", level: 3,
          gloss: "Pays the compile cost on the first call and reuses the result.",
          examples: [
            { code: `compiled = torch.compile(model)
out = compiled(x)`, notes: [{ at: "compiled(x)", text: "the first call triggers compilation" }] },
            { code: `compiled = torch.compile(model)
for _ in range(3):
    out = compiled(x)`, notes: [{ at: "range(3)", text: "later calls reuse the compiled code" }] },
            { code: `torch.compiler.reset()`, notes: [{ at: "reset()", text: "clears the compile cache" }] }
          ]
        }
      ]
    }
  ]
};
