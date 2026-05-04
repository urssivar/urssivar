---
title: "Kaitag Genealogy"
description: "Y-DNA, paternal lineages, and history of the Kaitag of Dagestan."
---

<script setup lang="ts">
import DNATable from "@/components/DNATable.vue";
import DNAChart from "@/components/DNAChart.vue";
import { useDNAData } from "@/composables/dna";

const { kits, villages, haplogroupMap } = useDNAData();
</script>

# Kaitag Genealogy

The Kaitag are an indigenous ethnic group of Dagestan whose [language](/language/) belongs to the Dargwic branch of the Northeast Caucasian family. Their homeland extends from the mountains of southern Dagestan along the Ulluchay River to the Caspian lowlands. In the early 20th century, the Kaitag inhabited 56 villages across nine historical microregions.

The Kaitag border closely related Kubachin and Dargin peoples to the northwest, Lezgic peoples of Tabasaran and Agul to the southwest, and Turkic peoples of Kumyk and Terekeme to the east. There was also a significant Juhuri (Mountain Jewish) community.

The Kaitag principality appears in historical records from the 8th century, controlling strategic territories inland from Derbent. For over a millennium it resisted successive imperial powers — Persian, Arab, Mongol, Ottoman — until Russia gradually eroded its sovereignty during the Caucasian War.

And now the next chapter begins.

## Y-DNA Distribution

Y-DNA data comes through [FamilyTreeDNA](https://www.familytreedna.com/groups/kaitag/about) and [YFull](https://www.yfull.com/groups/kaitag/).

<DNAChart/>

So far: **{{ kits.length }}** samples from **{{ villages.size }}/56** villages, across **{{ haplogroupMap.size }}** haplogroups.

<DNATable />
