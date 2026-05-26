import { Bed, CreditCard, HouseIcon, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import midLowerImage from "../assets/foto-cachorro.jpg";
import bottomImage from "../assets/foto-familia.jpg";
import midImage from "../assets/foto-mansao.jpg";
import topImage from "../assets/foto-mulher-janela.jpg";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Content } from "../components/content";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="absolute h-[30vh] w-screen bg-linear-to-r from-base-black-blue/40 from-0% to-transparent" />
      <div
        className="bg-cover bg-center min-h-[30vh] p-4.5"
        style={{ backgroundImage: `url(${topImage})` }}
      >
        <h1 className="relative text-2xl font-bold z-20 text-base-white">
          Elite Home
        </h1>
      </div>
      <Content>
        <h2 className="text-3xl font-bold leading-none h-17.25 w-77.75 text-base-black-blue">
          Encontre um lar perfeito para você
        </h2>
        <div className="flex flex-col gap-3.5">
          <h3 className="relative text-2xl font-bold z-20 text-base-black-blue">
            Alugar | Comprar
          </h3>
          <Card
            title="Cidade"
            subtitle="Busque por cidade"
            icon={<MapPin size={32} />}
          />
          <Card
            title="Bairro"
            subtitle="Busque por bairro"
            icon={<HouseIcon size={32} />}
          />
          <div className="flex gap-1.5">
            <Card
              title="Valor total"
              subtitle="Defina o valor"
              icon={<CreditCard size={32} />}
            />
            <Card
              title="Quartos"
              subtitle="N° de quartos"
              icon={<Bed size={32} />}
            />
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/imoveis")}
          className="my-8"
        >
          Buscar Imóveis
        </Button>
      </Content>
      <div
        className="bg-cover bg-center min-h-[30vh] p-4.5"
        style={{ backgroundImage: `url(${midImage})` }}
      />
      <div className="p-4.5 bg-base-neutral mb-4">
        <h2 className="text-2xl font-bold text-base-white mb-12">
          Imóvel dos seus sonhos, do seu jeito
        </h2>
        <p className="text-base-white mb-6">
          Aqui você encontra o imóvel ideal para você, seja grande, pequeno,
          seja uma casa, um apartamento, em um lugar mais afastado, ou próximo
          em região metropolitana, você escolhe!
        </p>
        <Button variant="secondary" onClick={() => navigate("/imoveis")}>
          Conhecer imóveis
        </Button>
      </div>
      <div
        className="bg-cover bg-center min-h-[30vh] p-4.5"
        style={{ backgroundImage: `url(${midLowerImage})` }}
      />
      <div className="p-4.5 bg-brand-primary mb-4">
        <h2 className="text-2xl font-bold text-base-white mb-12">
          Lazer total para o seu pet, seja ele qual for
        </h2>
        <p className="text-base-white mb-6">
          Encontre o lar ideal para seu pet, com todo o conforto, espaço, tudo o
          que é necessário para que ele possa ter uma vida saudável do jeitinho
          que você quiser.
        </p>
        <Button variant="secondary" onClick={() => navigate("/imoveis")}>
          Meu pet quer conhecer
        </Button>
      </div>
      <div
        className="bg-cover bg-center min-h-[30vh] p-4.5"
        style={{ backgroundImage: `url(${bottomImage})` }}
      />
      <div className="p-4.5 bg-warning mb-4">
        <h2 className="text-2xl font-bold mb-12">Um lar para chamar de seu</h2>
        <p className="mb-6">
          Do seu jeito, quando quiser, onde quiser, e o quanto quiser pagar, vem
          conhecer seu novo lar!
        </p>
        <Button variant="tertiary" onClick={() => navigate("/imoveis")}>
          Conhecer novo lar
        </Button>
      </div>
    </section>
  );
};
