---
title: "Urssivar: Kaitag Genealogy"
description: "Y-DNA distribution and family lineages of the Kaitags."

landing: true
---

<script setup lang="ts">
import DNATable from "@/components/DNATable.vue";
import DNAChart from "@/components/DNAChart.vue";
import { useDNAData } from "@/composables/useDNAData";

const { kits, villages, haplogroupMap } = useDNAData();
</script>

# [Urssivar](../index#kaitag-genealogy): Kaitag Genealogy

The Kaitags are an indigenous ethnic group of Dagestan whose language belongs to the Dargwic branch of the Northeast Caucasian family. The Kaitag ethnic zone extends from the Caspian lowlands to the mountains along the Ulluchay River in southern Dagestan. In the early 20th century, Kaitags inhabited 56 mountain villages forming nine historical microregions.

Kaitags border closely related Kubachins and Dargins to the northwest, Lezgic peoples (Tabasarans and Aghuls) to the southwest, and Turkic populations (Kumyks and Terekeme) to the east. Historically, there was also a significant Juhuri (Mountain Jewish) population.

The Kaitag principality emerges in historical records from the 8th century AD, controlling strategic territories inland of Derbent. For over a millennium Kaitag resisted successive imperial powers — Persian, Arab, Mongol, Ottoman, Russian — until the latter gradually eroded its sovereignty during the Caucasian War.

The position at the crossroads of civilizations, access to Caspian trade routes, and the region's diverse ethnic composition shaped Kaitags into a distinctive part of the East Caucasian mosaic.

## Y-DNA Distribution

We're collecting Y-DNA data through [FamilyTreeDNA](https://www.familytreedna.com/groups/kaitag/about) and [YFull](https://www.yfull.com/groups/kaitag/).

**{{ kits.length }}** samples from **{{ villages.size }}/56** villages, representing **{{ haplogroupMap.size }}** haplogroups.

<DNAChart/>

<DNATable />
