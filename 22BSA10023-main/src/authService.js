export const getAuthToken = async () => {
  try {
    const authResponse = await fetch("http://20.244.56.144/test/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: "VITBhopal",
        clientID: "37bb493c-73d3-47ea-8675-21f66ef9b735",
        clientSecret: "XOyo1ORPasKWODAN",
        ownerName: "AmanKumar",
        ownerEmail: "amankumar.2022@vitbhopal.ac.in",
        rollNo: "1",
      }),
    });

    if (!authResponse.ok) throw new Error("Failed to obtain token");

    const authData = await authResponse.json();
    return authData.access_token;
  } catch (error) {
    console.warn("Error obtaining auth token:", error.message);
    return null;
  }
};
