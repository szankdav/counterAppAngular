import { Injectable } from '@angular/core';
import { ResultSet, createClient } from "@libsql/client";

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  client = createClient({
    url: "libsql://counter-szankdav.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTA3NjE4MTgsImlkIjoiNWJhYmIwOTItODk0Mi00NTU1LWI3NDAtYWM3OTE0OWI1MTNjIn0.tuaOahYx0A4DoDyGkbXoRUg-YS8_flmeeYzU7vlSYMTO1KDT86jV6EzjEmozYtdui1mhBg-rXydKA5_zatmCCQ",
  });

  async queryHandler(query: string): Promise<ResultSet | null>{
    try {
      return await this.client.execute(query);
    } catch (error) {
      console.error("Error while execute query: ", error)
      return null
    }
  }

   async getNumberFromServer(): Promise<number> {
    const result = await this.queryHandler("SELECT countedNumber FROM countedNumbers");
    return result?.rows[0]['countedNumber'] as number ?? 0;
  }

  async increaseNumberOnServer(): Promise<ResultSet | null> {
    return await this.queryHandler("UPDATE countedNumbers SET countedNumber = countedNumber + 1")
  }

  async decreaseNumberOnServer(): Promise<ResultSet | null> {
    return await this.queryHandler("UPDATE countedNumbers SET countedNumber = countedNumber - 1")
  }
}
