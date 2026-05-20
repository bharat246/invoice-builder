import React, { useRef, useState } from "react";

const App = () => {
  const invoiceRef = useRef();

  const [client, setClient] = useState({
    name: "",
    address: "",
    invoiceNumber: "",
    date: "",
  });

  const [items, setItems] = useState([
    {
      description: "",
      quantity: 1,
      rate: 0,
    },
  ]);

  const [tax, setTax] = useState(18);

  // Add Item
  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        rate: 0,
      },
    ]);
  };

  // Remove Item
  const removeItem = (index) => {
    const data = [...items];
    data.splice(index, 1);
    setItems(data);
  };

  // Handle Item Change
  const handleItemChange = (index, field, value) => {
    const data = [...items];
    data[index][field] = value;
    setItems(data);
  };

  // Calculations
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.rate,
    0
  );

  const taxAmount = (subtotal * tax) / 100;

  const total = subtotal + taxAmount;

  // Download PDF
 const downloadPDF = () => {
  window.print();
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">
            Invoice Builder
          </h1>

          <button
            onClick={downloadPDF}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Download PDF
          </button>
        </div>

        {/* Invoice */}
        <div
          ref={invoiceRef}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          {/* Client Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <div>
              <label className="font-semibold">Client Name</label>

              <input
                type="text"
                placeholder="Enter Client Name"
                value={client.name}
                onChange={(e) =>
                  setClient({ ...client, name: e.target.value })
                }
                className="w-full border p-3 rounded mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">Invoice Number</label>

              <input
                type="text"
                placeholder="INV-001"
                value={client.invoiceNumber}
                onChange={(e) =>
                  setClient({
                    ...client,
                    invoiceNumber: e.target.value,
                  })
                }
                className="w-full border p-3 rounded mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">Address</label>

              <textarea
                placeholder="Enter Address"
                value={client.address}
                onChange={(e) =>
                  setClient({
                    ...client,
                    address: e.target.value,
                  })
                }
                className="w-full border p-3 rounded mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">Date</label>

              <input
                type="date"
                value={client.date}
                onChange={(e) =>
                  setClient({
                    ...client,
                    date: e.target.value,
                  })
                }
                className="w-full border p-3 rounded mt-2"
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-blue-600 text-white">

                  <th className="p-3 text-left">
                    Description
                  </th>

                  <th className="p-3">
                    Qty
                  </th>

                  <th className="p-3">
                    Rate
                  </th>

                  <th className="p-3">
                    Amount
                  </th>

                  <th className="p-3">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b">

                    <td className="p-3">
                      <input
                        type="text"
                        placeholder="Item Description"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full border p-2 rounded"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        className="w-20 border p-2 rounded"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "rate",
                            Number(e.target.value)
                          )
                        }
                        className="w-24 border p-2 rounded"
                      />
                    </td>

                    <td className="p-3 font-semibold">
                      ₹{item.quantity * item.rate}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => removeItem(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Add Item */}
          <button
            onClick={addItem}
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
          >
            + Add Item
          </button>

          {/* Tax */}
          <div className="mt-8 flex items-center gap-4">
            <label className="font-semibold text-lg">
              Tax (%)
            </label>

            <input
              type="number"
              value={tax}
              onChange={(e) => setTax(Number(e.target.value))}
              className="border p-3 rounded w-32"
            />
          </div>

          {/* Totals */}
          <div className="mt-10 flex justify-end">

            <div className="w-full md:w-96 bg-gray-50 p-6 rounded-lg">

              <div className="flex justify-between mb-3">
                <span className="font-medium">
                  Subtotal:
                </span>

                <span>
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="font-medium">
                  Tax:
                </span>

                <span>
                  ₹{taxAmount.toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Total:</span>

                <span>
                  ₹{total.toFixed(2)}
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
