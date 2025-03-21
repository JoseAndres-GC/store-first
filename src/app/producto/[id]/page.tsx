"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Hero from "@/components/hero";
import Header from "@/components/header";
import Footer from "@/components/footer";

const vendedores = [
  { nombre: "Blanca", numero: "59161347100" },
  { nombre: "Huby", numero: "59169215271" },
  { nombre: "Agustin", numero: "59177733333" },
];

export default function ProductoPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const product: Product | undefined = products.find((p) => p.id === id);
  const [cantidad, setCantidad] = useState(1);
  const [vendedor, setVendedor] = useState(vendedores[0]);
  const [tipoCompra, setTipoCompra] = useState<"unidad" | "caja">("unidad");

  if (!product) return notFound();

  const precioSeleccionado =
    tipoCompra === "unidad" ? product.priceUnitario : product.priceCaja;

  const mensaje = `Hola, quiero comprar *${cantidad}x ${product.name} (${tipoCompra})* a $${precioSeleccionado} cada uno.`;
  const urlWhatsapp = `https://wa.me/${
    vendedor.numero
  }?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F8F5] text-[#2E3A59]">
      <Hero />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16 flex-1">
        <div className="flex flex-col md:flex-row gap-10">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={0}
            className="rounded-lg object-cover w-full md:w-1/2 bg-white p-4"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-[#388E3C] font-semibold mb-6">
              ${precioSeleccionado}
            </p>

            <div className="flex flex-col gap-4">
              <label className="text-lg font-medium">Tipo de compra:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="unidad"
                    checked={tipoCompra === "unidad"}
                    onChange={() => setTipoCompra("unidad")}
                  />
                  Unidad (${product.priceUnitario})
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="caja"
                    checked={tipoCompra === "caja"}
                    onChange={() => setTipoCompra("caja")}
                  />
                  Caja (${product.priceCaja})
                </label>
              </div>

              <label htmlFor="cantidad" className="text-lg font-medium">
                Cantidad:
              </label>
              <input
                type="number"
                id="cantidad"
                min={1}
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                className="bg-white text-black border border-gray-300 p-2 rounded w-24"
              />

              <label htmlFor="vendedor" className="text-lg font-medium">
                Vendedor:
              </label>
              <select
                id="vendedor"
                value={vendedor.nombre}
                onChange={(e) =>
                  setVendedor(
                    vendedores.find((v) => v.nombre === e.target.value)!
                  )
                }
                className="bg-white text-black border border-gray-300 p-2 rounded"
              >
                {vendedores.map((v) => (
                  <option key={v.numero} value={v.nombre}>
                    {v.nombre}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  window.open(urlWhatsapp, "_blank");
                  setCantidad(1);
                }}
                className="bg-[#388E3C] text-white py-2 px-6 rounded hover:bg-[#2E7D32] transition text-center"
              >
                Agregar al carrito (WhatsApp)
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
