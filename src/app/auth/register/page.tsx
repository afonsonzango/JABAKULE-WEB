"use client";

import "@/assets/styles/pages/auth/register/register.css";
import Image from "next/image";

import logo from "@/assets/midea/logo-icon/logo-jabakule-307x83.png";
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import WaveLoader from "@/components/cui/wave-loader/wave-loader";
import { AlertCircle } from "lucide-react";
import axiosSimple from "@/components/cui/hooks/axiosInstances/axiosSimple";

interface User {
  name: string | undefined;
  email: string | undefined;
  nif: string | undefined;
  country: string | undefined;
  province: string | undefined;
  address: string | undefined;
  phone: number | undefined;
  password: string | undefined;
  password_confirmation: string | undefined;
}

const Page = () => {
  const [countries, setCountries] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState<User>({
    name: undefined,
    email: undefined,
    nif: undefined,
    country: undefined,
    province: undefined,
    address: undefined,
    phone: undefined,
    password: undefined,
    password_confirmation: undefined
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
  }, [user]);

  const RegisterValidation = () => {

    const { name, email, nif, country, province, address, phone, password, password_confirmation } = user;

    if (!name || name.split(' ').length < 2) {
      setError("E obrigatorio usar pelo menos dois nomes.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("E-mail inválido.");
      return;
    }

    if (!nif || !/^(?=(?:.*[A-Z]){2})(?=(?:.*\d){12})[A-Z\d]{14}$/.test(nif)) {
      setError("O NIF invalido");
      return;
    }

    if (!country || country.trim() === '') {
      setError("Selecione o pais.");
      return;
    }

    if (!province || province.trim() === '') {
      setError("A província não pode ser vazia.");
      return;
    }

    if (!address || address.trim() === '') {
      setError("O endereço não pode ser vazio.");
      return;
    }

    if (!phone || !/^\d{9}$/.test(String(phone))) {
      setError("Telefone invalido");
      return;
    }

    if (!password || !password_confirmation || password !== password_confirmation) {
      setError("As senhas devem ser iguais.");
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    setError("");
  }

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);

      try {
        const res = await axios.get("http://api.geonames.org/countryInfoJSON?username=jabakuleteste");

        console.log(res);

        const formattedCountries = res.data.geonames.map((country: any) => ({
          name: country.countryName,
        }));

        setCountries(formattedCountries);
      } catch (error) {
        setError("Erro ao buscar países, tente novamente mais tarde");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    RegisterValidation();

    setLoading(true);

    try {
      const res = await axiosSimple.post(`/user/create`, {
        name: user.name,
        email: user.email,
        nif: user.nif,
        country: user.country,
        province: user.province,
        address: user.address,
        phone_number: user.phone,
        password: user.password
      });

      console.log(res);
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        setError("Verifique sua connexao com a internet.");
      }else{
        setError("Algo de errado aconteceu, tente novamente mais tarde");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-main-section">
      <div className="container">
        <div className="logo-center mb-3">
          <Link href={"/"}>
            <Image priority src={logo} alt={"Logo center element"} />
          </Link>
        </div>

        <div className="register-center mb-3">
          <span className="register-center-text">jabakule - register</span>
        </div>

        {error !== "" && (
          <div className="error-handleing-styles">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        )}

        {loading ? (<WaveLoader />) : (
          <div className="register-form-container">
            <form onSubmit={(e) => handleSubmit(e)} className="register-main-form">
              <div className="form-controller">
                <div className="mb-5">
                  <div className="title-section">Informacoes pessoais</div>
                  <div className="form-controller-dual">
                    <div className="form-input-component mb-1">
                      <div>
                        <label htmlFor="email">Nome</label>
                      </div>
                      <div>
                        <input disabled={loading} value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} type="text" name="name" id="name" placeholder="Digite seu nome" />
                      </div>
                    </div>
                    <div className="form-input-component mb-1">
                      <div>
                        <label htmlFor="email">E-mail</label>
                      </div>
                      <div>
                        <input disabled={loading} value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="text" name="email" id="email" placeholder="Digite seu e-mail" />
                      </div>
                    </div>
                  </div>

                  <div className="form-controller-dual">
                    <div className="form-input-component mb-1">
                      <div>
                        <label htmlFor="nif">NIF</label>
                      </div>
                      <div>
                        <input disabled={loading} value={user.nif} onChange={(e) => setUser({ ...user, nif: e.target.value })} type="text" name="nif" id="nif" placeholder="Digite seu nif" />
                      </div>
                    </div>
                    <div className="form-input-component mb-1">
                      <div>
                        <label htmlFor="email">Pais</label>
                      </div>
                      <div>
                        <Select disabled={loading} value={user.country} onValueChange={(value: string) => setUser({ ...user, country: value })}>
                          <SelectTrigger className="w-[180px]" style={{ background: "rgb(var(--light))", color: "rgb(var(--dark))" }}>
                            <SelectValue placeholder={"Selecione seu pais" || user.country} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Selecione seu pais</SelectLabel>

                              {countries?.map((country: any) => {
                                return (
                                  <SelectItem value={country.name}>{country.name}</SelectItem>
                                )
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="form-input-component mb-1">
                      <div>
                        <label htmlFor="email">Provincia</label>
                      </div>
                      <div>
                        <input value={user.province} disabled={!user.country || loading} onChange={(e) => setUser({ ...user, province: e.target.value })} type="text" name="provincia" id="provincia" placeholder="Digite sua provincia" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-controller-dual">
                  <div className="form-input-component mb-1">
                    <div>
                      <label htmlFor="email">Endereco</label>
                    </div>
                    <div>
                      <input value={user.address} disabled={loading} onChange={(e) => setUser({ ...user, address: e.target.value })} type="text" name="address" id="address" placeholder="Digite seu endereco" />
                    </div>
                  </div>
                  <div className="form-input-component mb-1">
                    <div>
                      <label htmlFor="email">Telefone</label>
                    </div>
                    <div>
                      <input value={Number(user.phone)} disabled={loading} onChange={(e) => setUser({ ...user, phone: Number(e.target.value) })} type="text" name="email" id="telefone" placeholder="Digite seu telefone" />
                    </div>
                  </div>
                </div>


                <div className="mb-5">
                  <div className="title-section">Seguranca e autenticacao</div>

                  <div className="form-controller-dual">
                    <div className="form-input-component mb-3">
                      <div>
                        <label htmlFor="password">Password</label>
                      </div>
                      <div>
                        <input value={user.password} disabled={loading} onChange={(e) => setUser({ ...user, password: e.target.value })} type="text" name="password" id="password" placeholder="Digite sua password" />
                      </div>
                    </div>
                    <div className="form-input-component mb-3">
                      <div>
                        <label htmlFor="password">Password - Confimacao</label>
                      </div>
                      <div>
                        <input value={user.password_confirmation} disabled={loading} onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })} type="text" name="password" id="password" placeholder="Digite sua password" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-input-component mb-1">
                  <button disabled={loading} className="submit-button" type={"submit"}>
                    {loading ? (<WaveLoader theme={"rgb(var(--light))"} style={{ transform: "scale(.7)", marginTop: -2 }} />) : "Register"}
                  </button>
                </div>
              </div>
            </form>

            <div className="register-auth-options">
              <Link rel="stylesheet" href="/auth/login">Entrar - Login</Link>
            </div>
          </div>
        )}

      </div>
    </section >
  )
}

export default Page;