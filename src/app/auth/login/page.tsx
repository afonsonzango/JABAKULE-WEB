"use client";

import Cookies from 'js-cookie';
import logo from "@/assets/midea/logo-icon/logo-jabakule-307x83.png";
import "@/assets/styles/pages/auth/login/login.css";
import axiosAuthed from "@/components/cui/hooks/axiosInstances/axiosAuth";
import WaveLoader from "@/components/cui/wave-loader/wave-loader";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AuthProps {
  email: string;
  password: string;
}

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [auth, setAuth] = useState<AuthProps>({
    email: "",
    password: ""
  });

  useEffect(() => {
    setError("");
  }, [auth])

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get('token');
      const response = await axiosAuthed.post(`/user/auth/login`, {
        email: auth.email,
        password: auth.password
      }, {
        headers: {
          token: token
        }
      });

      if (response.status === 200 && !response.data.error) {
        const newToken = response.data.token;

        Cookies.set('token', newToken, { expires: 1 });  

        window.location.href = '/get-started';
      }

      console.log(response);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Algo de errado aconteceu, tente novamente mais tarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-main-section">
      <div className="container">
        <div className="login-middle-section">
          <div className="login-logo-center mb-3">
            <Link href={"/"}>
              <Image priority src={logo} alt={"Logotipo Jabakule"} />
            </Link>
          </div>
          <div className="login-center mb-3">
            <span className="login-center-text">jabakule - login</span>
          </div>

          {error !== "" && (
            <div className="error-handleing-styles">
              <AlertCircle className="mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-main-form">
            <div className="form-controller">
              <div className="form-input-component mb-1">
                <div>
                  <label htmlFor="email">E-mail</label>
                </div>
                <div>
                  <input disabled={loading} value={auth.email} onChange={(e) => setAuth({ ...auth, email: e.target.value })} type="text" name="email" id="email" placeholder="Digite seu e-mail" />
                </div>
              </div>
              <div className="form-input-component mb-3">
                <div>
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                  <input disabled={loading} value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} type="password" name="password" id="password" placeholder="Digite sua password" />
                </div>
              </div>
              <div className="login-check-points mb-3">
                <span><Checkbox disabled={loading} /> Me lembre</span>
                <span><Link href={""} className="link-forgot-password">Esqueceu a senha?</Link></span>
              </div>

              <div className="form-input-component mb-1">
                <button disabled={loading} className="submit-button" type={"submit"}>
                  {loading ? (<WaveLoader theme={"rgb(var(--light))"} style={{ transform: "scale(.7)", marginTop: -2 }} />) : "Login"}
                </button>
              </div>
            </div>
          </form>

          <div className="login-auth-options">
            <Link rel="stylesheet" href="/auth/register">Criar nova conta</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page;